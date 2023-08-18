import { useState } from 'react'
import { Animal } from 'hooks/Animal/AnimalListStore'
import { Live } from 'hooks/Live/LiveSearchStore'
import AltImage from 'images/altImage.png'
import { useNavigate } from 'react-router'
import CreateSession from 'components/Live/CreateSession'

interface CardInfoProps {
  animal: Animal
  lives: Live[]
}
export default function CustomCard({ animal, lives }: CardInfoProps) {
  const [isModal, setIsModal] = useState(false)
  let live = 0
  if (lives.length > 0) {
    live = lives[0].live_id
  }
  const navigate = useNavigate()
  const moveToLivePage = () => {
    navigate(`/live/streaming/${live}`)
  }
  const moveToStreamingPage = () => {
    setIsModal(true)
  }
  const moveToEditAnimal = () => {
    navigate('/animal/update', { state: animal })
  }

  return (
    <>
      {isModal ? (
        <>
          <CreateSession
            animalData={animal}
            setIsModal={setIsModal}
          ></CreateSession>
        </>
      ) : (
        <div className="cursor-pointer group relative block bg-black h-80 w-64 rounded-tl-xl rounded-br-xl overflow-hidden">
          <img
            alt="animalPhoto"
            src={
              animal.animal_photo_url === '' || animal.animal_photo_url === null
                ? AltImage
                : animal.animal_photo_url
            }
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div className="relative flex flex-col justify-between p-4 h-full">
            <p className="text-md font-bold text-white sm:text-2xl">
              {animal.name}
            </p>
            <div className="">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-md font-semibold  uppercase tracking-widest flex justify-center">
                  <p className="text-amber-400">{animal.age}</p>{' '}
                  <p className="text-white">살</p>
                </div>
                <p className="text-sm text-white">
                  {animal.specie}/{animal.breed}
                </p>
              </div>
            </div>

            <div className="flex justify-evenly">
              <button
                className="bg-red-500 z-20 hover:bg-red-300 min-w-[40%] rounded-md text-gray-100 py-1 px-2"
                onClick={moveToEditAnimal}
              >
                정보수정
              </button>
              {live ? (
                <button
                  className="bg-green-500 hover:bg-green-300 z-20 min-w-[40%] rounded-md text-gray-100 py-1 px-2"
                  onClick={moveToLivePage}
                >
                  참여하기
                </button>
              ) : (
                <button
                  className="bg-gray-300 hover:bg-amber-500 z-20 min-w-[40%] rounded-md py-1 px-2"
                  onClick={moveToStreamingPage}
                >
                  방송시작
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
