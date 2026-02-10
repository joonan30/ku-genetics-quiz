const BASE = import.meta.env.BASE_URL

// Maps entity ID → image path relative to public/
const IMAGE_MAP = {
  // Seeds
  'red-seed': 'images/seeds/red-seed.png',
  'yellow-seed': 'images/seeds/yellow-seed.png',
  'blue-seed': 'images/seeds/blue-seed.png',
  'green-seed': 'images/seeds/green-seed.png',
  // Plants - DNA
  'hallan': 'images/plants/hallan.png',
  'gwangneung-yogangkkot': 'images/plants/gwangneung-yogangkkot.png',
  'bokjumeoni-ran': 'images/plants/bokjumeoni-ran.png',
  'miseon-namu': 'images/plants/miseon-namu.png',
  'gusang-namu': 'images/plants/gusang-namu.png',
  // Plants - Mendelian
  'halla-songipul': 'images/plants/halla-songipul.png',
  'jeju-gosari-sam': 'images/plants/jeju-gosari-sam.png',
  'ulleung-gukhwa': 'images/plants/ulleung-gukhwa.png',
  'seom-gaeyagwang-namu': 'images/plants/seom-gaeyagwang-namu.png',
  'ulleung-solsong-namu': 'images/plants/ulleung-solsong-namu.png',
  // Plants - Molecular
  'seom-siho': 'images/plants/seom-siho.png',
  'ganeun-doljjeogwi': 'images/plants/ganeun-doljjeogwi.png',
  'geumgang-bommaji': 'images/plants/geumgang-bommaji.png',
  'halla-somdari': 'images/plants/halla-somdari.png',
  'jeju-baekseohyang': 'images/plants/jeju-baekseohyang.png',
  // Plants - Evolution
  'hangyeryeong-pul': 'images/plants/hangyeryeong-pul.png',
  'seom-malnari': 'images/plants/seom-malnari.png',
  'wang-eunbangulkkot': 'images/plants/wang-eunbangulkkot.png',
  'seppul-tugukkkot': 'images/plants/seppul-tugukkkot.png',
  'nado-pungnan': 'images/plants/nado-pungnan.png',
  // Animals
  'bandalgasum-gom': 'images/companions/bandalgasum-gom.png',
  'soodal': 'images/companions/soodal.png',
  'saek': 'images/companions/saek.png',
  'noru': 'images/companions/noru.png',
  'gorani': 'images/companions/gorani.png',
  'kkachi': 'images/companions/kkachi.png',
  'wonangi': 'images/companions/wonangi.png',
  'durumi': 'images/companions/durumi.png',
  'hwangsae': 'images/companions/hwangsae.png',
  'maemi': 'images/companions/maemi.png',
  // Aquatic
  'euno': 'images/companions/euno.png',
  'swiri': 'images/companions/swiri.png',
  'beodeulchi': 'images/companions/beodeulchi.png',
  'miho-jonggae': 'images/companions/miho-jonggae.png',
  'dori': 'images/companions/dori.png',
  'ggomtijangeo': 'images/companions/ggomtijangeo.png',
  'mulgae': 'images/companions/mulgae.png',
  'jarak-geobuk': 'images/companions/jarak-geobuk.png',
  // Insects
  'jangsu-haneulso': 'images/companions/jangsu-haneulso.png',
  'saseumbeollae': 'images/companions/saseumbeollae.png',
  'wang-jamjari': 'images/companions/wang-jamjari.png',
  'bangae': 'images/companions/bangae.png',
  'bbeoldure': 'images/companions/bbeoldure.png',
  'mudeungsan-nabbi': 'images/companions/mudeungsan-nabbi.png',
  'jjomae-maemi': 'images/companions/jjomae-maemi.png',
}

export function getImageUrl(id) {
  const path = IMAGE_MAP[id]
  if (!path) return null
  return `${BASE}${path}`
}

// Size presets (px)
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80,
}

export default function SpriteImg({ id, size = 'md', className = '', alt = '' }) {
  const url = getImageUrl(id)
  const px = typeof size === 'number' ? size : (SIZES[size] || 40)

  if (!url) {
    return <span className={className} style={{ width: px, height: px, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: px * 0.6 }}>?</span>
  }

  return (
    <img
      src={url}
      alt={alt || id}
      width={px}
      height={px}
      className={`object-contain ${className}`}
      style={{ width: px, height: px }}
      draggable={false}
    />
  )
}
