import 'css/noticeItem.css'

interface Animal {
  animal_uuid: string | null
  animal_photo_url: string | undefined
  name: string | null
  age: string | null
  specie: string | null
  breed: string | null
  gender: string | null
  character: string | null
}

interface AnimalIntroduceInfoProps {
  animal: Animal
}

function IntroduceItem({ animal }: AnimalIntroduceInfoProps) {
  const ulStyle = {
    marginTop: '10px',
    fontSize: '13px',
  }

  const gender = animal.gender == 'MALE' ? '남자' : '여자'
  const character =
    animal.character == 'ACTIVE'
      ? '활발한'
      : animal.character == 'PEACE'
      ? '평온한'
      : '민감한'

  return (
    <>
      <div className="overflow-hidden w-[150px] bg-white/75 rounded-xl cursor-pointer">
        <div className="">
          <div className="">
            <div>
              <img className="h-[200px]" src={animal.animal_photo_url} alt="" />
            </div>
            <div className="text-sm flex flex-col justify-between">
              <div className="">
                {animal.name}({animal.age}세)
              </div>
              <div>{animal.breed}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroduceItem
