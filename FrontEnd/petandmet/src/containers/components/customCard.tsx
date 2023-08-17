import { Animal } from 'hooks/Animal/AnimalListStore'
import { Live } from 'hooks/Live/LiveSearchStore'
import { useNavigate } from 'react-router'

interface CardInfoProps {
  animal: Animal
  live: Live
}
export default function CustomCard({ animal, live }: CardInfoProps) {
  const navigate = useNavigate()
  const moveToLivePage = () => {
    navigate(`/live/streaming/${live.live_id}`)
  }
  const moveToStreamingPage = () => {
    navigate(`/openlive`, { state: animal })
  }

  return (
    <div className="cursor-pointer group relative block bg-black h-80 w-64 rounded-tl-xl rounded-br-xl overflow-hidden">
      <img
        alt="animalPhoto"
        src={animal.animal_photo_url}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4">
        <p className="text-md font-bold text-white sm:text-2xl">
          {animal.name}
        </p>

        <div className="mt-32">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <div className="text-md font-semibold  uppercase tracking-widest flex justify-center">
              <p className="text-amber-400">{animal.age}</p>{' '}
              <p className="text-white">살</p>
            </div>
            <p className="text-sm text-white">
              {animal.specie}/{animal.breed}
            </p>
            <div>
              <button className="bg-red-300 z-20 hover:bg-red-500">수정</button>
              {live ? (
                <button
                  className="bg-amber-300 hover:bg-amber-500 z-20"
                  onClick={moveToLivePage}
                >
                  참여하기
                </button>
              ) : (
                <button
                  className="bg-amber-300 hover:bg-amber-500 z-20"
                  onClick={moveToStreamingPage}
                >
                  방송시작
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
