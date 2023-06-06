import Offers from '../components/Offers'

export function generateMetadata() {

  return {
      title: 'العروض',
  }
}

export default function OffersPage() {
  return (
    <div className='offers-container'>
      <h1>العروض</h1>
      <Offers />
    </div>
  )
}
