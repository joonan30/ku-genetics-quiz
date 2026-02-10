import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, deleteField } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password, name, studentId) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const profile = {
      name,
      studentId,
      email,
      character: null,
      level: 1,
      dnaXp: 0,
      mendelianXp: 0,
      molecularXp: 0,
      evolutionXp: 0,
      equippedCompanions: { animal: null, aquatic: null, insect: null },
      companions: [],
      completedStages: [],
      currentStage: 'yangpyeong',
      totalDistance: 0,
      achievements: [],
      correctAnswers: 0,
      totalAnswers: 0,
      bestStreak: 0,
      createdAt: new Date().toISOString(),
    }
    await setDoc(doc(db, 'users', cred.user.uid), profile)
    await sendEmailVerification(cred.user)
    await signOut(auth)
    setUserProfile(null)
    return cred
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function resendVerification() {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser)
    }
  }

  function logout() {
    setUserProfile(null)
    return signOut(auth)
  }

  async function fetchProfile(uid) {
    const snap = await getDoc(doc(db, 'users', uid))
    if (snap.exists()) {
      let data = snap.data()

      // Migrate old equippedItems/inventory → equippedCompanions/companions
      const needsMigration = data.equippedItems !== undefined || (data.inventory !== undefined && data.companions === undefined)
      if (needsMigration) {
        const migration = {}
        if (data.equippedCompanions === undefined) {
          migration.equippedCompanions = { animal: null, aquatic: null, insect: null }
        }
        if (data.companions === undefined) {
          migration.companions = []
        }
        // Remove old fields
        if (data.equippedItems !== undefined) migration.equippedItems = deleteField()
        if (data.inventory !== undefined && data.companions === undefined) migration.inventory = deleteField()

        await updateDoc(doc(db, 'users', uid), migration)

        // Update local data
        data = { ...data, ...migration }
        delete data.equippedItems
        delete data.inventory
        if (!data.equippedCompanions) data.equippedCompanions = { animal: null, aquatic: null, insect: null }
        if (!data.companions) data.companions = []
      }

      setUserProfile(data)
      return data
    }
    return null
  }

  async function updateProfile(data) {
    if (!currentUser) return
    await updateDoc(doc(db, 'users', currentUser.uid), data)
    setUserProfile((prev) => ({ ...prev, ...data }))
  }

  async function refreshProfile() {
    if (currentUser) {
      return fetchProfile(currentUser.uid)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await fetchProfile(user.uid)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateProfile,
    refreshProfile,
    resendVerification,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
