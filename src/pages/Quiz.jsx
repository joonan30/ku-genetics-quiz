import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, updateDoc, increment, arrayUnion, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { getStageById } from '../data/stages'
import { calculateXpEarned, getComboBonus, getLevelFromXp, getTotalXp, getCategoryXpField } from '../utils/xpCalculator'
import { checkEvolution } from '../data/characters'
import { getStageStatus } from '../utils/stageUnlock'
import { achievements, checkAchievement } from '../data/achievements'
import QuizCard from '../components/quiz/QuizCard'
import QuizResults from '../components/quiz/QuizResults'
import LevelUpModal from '../components/common/LevelUpModal'
import AchievementPopup from '../components/common/AchievementPopup'

export default function Quiz() {
  const { stageId } = useParams()
  const navigate = useNavigate()
  const { currentUser, userProfile, refreshProfile } = useAuth()

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState({ correct: 0, xpEarned: 0, comboBonus: 0 })
  const [streak, setStreak] = useState(0)
  const [finished, setFinished] = useState(false)
  const [levelUp, setLevelUp] = useState(null)
  const [evolutionData, setEvolutionData] = useState(null)
  const [newAchievement, setNewAchievement] = useState(null)
  const [error, setError] = useState(null)

  const stage = stageId ? getStageById(stageId) : null

  useEffect(() => {
    if (!stage) {
      navigate('/map')
      return
    }

    async function fetchQuestions() {
      try {
        const q = query(collection(db, 'questions'), where('stage', '==', stage.id))
        const snapshot = await getDocs(q)
        const qs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        // Shuffle
        for (let i = qs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[qs[i], qs[j]] = [qs[j], qs[i]]
        }
        setQuestions(qs.slice(0, stage.questionCount))
      } catch (err) {
        console.error('Failed to fetch questions:', err)
        setError('Failed to load questions. Please try again.')
      }
    }

    fetchQuestions()
  }, [stage, navigate])

  const checkNewAchievements = useCallback(async (updatedProfile) => {
    const currentAchievements = updatedProfile.achievements || []
    for (const ach of achievements) {
      if (!currentAchievements.includes(ach.id) && checkAchievement(ach, updatedProfile)) {
        const userRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userRef, { achievements: arrayUnion(ach.id) })
        setNewAchievement(ach)
        break
      }
    }
  }, [currentUser])

  async function handleSelect(answerIndex) {
    setSelectedAnswer(answerIndex)
    setAnswered(true)

    const question = questions[index]
    const isCorrect = answerIndex === question.correctAnswer
    const userRef = doc(db, 'users', currentUser.uid)

    if (isCorrect) {
      const newStreak = streak + 1
      setStreak(newStreak)

      const baseXp = stage.xpPerQuestion
      const xp = calculateXpEarned(baseXp, question.category, userProfile)
      const combo = getComboBonus(newStreak)

      const oldLevel = getLevelFromXp(getTotalXp(userProfile))
      const xpField = getCategoryXpField(question.category)

      const newCategoryXp = (userProfile[xpField] || 0) + xp + combo
      const tempProfile = { ...userProfile, [xpField]: newCategoryXp }
      const newLevel = getLevelFromXp(getTotalXp(tempProfile))

      setScore((s) => ({
        correct: s.correct + 1,
        xpEarned: s.xpEarned + xp,
        comboBonus: s.comboBonus + combo,
      }))

      const updateData = {
        [xpField]: increment(xp + combo),
        level: newLevel,
        correctAnswers: increment(1),
        totalAnswers: increment(1),
        bestStreak: Math.max(userProfile.bestStreak || 0, newStreak),
      }
      await updateDoc(userRef, updateData)

      if (newLevel > oldLevel) {
        setLevelUp(newLevel)
        const evo = checkEvolution(userProfile.character, oldLevel, newLevel)
        if (evo) setEvolutionData(evo)
      }

      // Check achievements
      const updatedForCheck = {
        ...userProfile,
        [xpField]: newCategoryXp,
        correctAnswers: (userProfile.correctAnswers || 0) + 1,
        bestStreak: Math.max(userProfile.bestStreak || 0, newStreak),
      }
      checkNewAchievements(updatedForCheck)
    } else {
      setStreak(0)
      await updateDoc(userRef, { totalAnswers: increment(1) })
    }
  }

  async function handleNext() {
    if (index + 1 >= questions.length) {
      // Check if passed
      const pct = (score.correct + (selectedAnswer === questions[index]?.correctAnswer && answered ? 0 : 0)) / questions.length
      const passed = (score.correct / questions.length) >= stage.requiredAccuracy

      if (passed && !(userProfile.completedStages || []).includes(stage.id)) {
        const userRef = doc(db, 'users', currentUser.uid)
        const updateData = {
          completedStages: arrayUnion(stage.id),
          totalDistance: Math.max(userProfile.totalDistance || 0, stage.distance),
        }
        // Add reward companion
        if (stage.reward?.companion) {
          updateData.companions = arrayUnion(stage.reward.companion)
        }
        await updateDoc(userRef, updateData)

        // Check distance/stage achievements
        const updatedProfile = {
          ...userProfile,
          completedStages: [...(userProfile.completedStages || []), stage.id],
          totalDistance: Math.max(userProfile.totalDistance || 0, stage.distance),
        }
        checkNewAchievements(updatedProfile)
      }

      await refreshProfile()
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!stage || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <QuizResults
          score={score.correct}
          total={questions.length}
          xpEarned={score.xpEarned}
          comboBonus={score.comboBonus}
          stageName={stage.name}
          onRetry={() => window.location.reload()}
        />
        {newAchievement && (
          <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto mb-4">
        <p className="text-sm text-gray-500 text-center">
          {stage.name} · {stage.korean} · {stage.distance}km from Anam
        </p>
      </div>
      <QuizCard
        question={questions[index]}
        index={index}
        total={questions.length}
        selectedAnswer={selectedAnswer}
        answered={answered}
        comboStreak={streak}
        onSelect={handleSelect}
        onNext={handleNext}
      />
      {levelUp && <LevelUpModal level={levelUp} evolution={evolutionData} onClose={() => { setLevelUp(null); setEvolutionData(null) }} />}
      {newAchievement && (
        <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
      )}
    </div>
  )
}
