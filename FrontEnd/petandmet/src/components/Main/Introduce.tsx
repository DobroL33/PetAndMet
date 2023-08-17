import IntroduceItem from "./IntroduceItem";
import "css/noticeItem.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAnimalList, Animal } from 'hooks/Animal/useAnimalList'

function Introduce() {

  const [animalToShow, setAnimalsToShow] = useState<any[]>([])
  const { data, refetch } = useAnimalList()

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (data) {
      data.response.slice(0, 3)
      console.log(data.response)
      console.log(data.response.slice(0,3))
      setAnimalsToShow(data.response.slice(0,3))
    }
  }, [data])

  return (
    <>
      <div className="flex justify-between bg-sky-500/50 overflow-hidden h-[600px] pt-[30px] pb-[30px] pl-0 rounded-md mt-[20px] relative">
        <div className="ml-12 flex flex-col justify-between text-3xl text-left bg-white/50 rounded-3xl px-4 py-2">
          <p className="leading-normal">가족이 되어 줄</p>
          <strong className="leading-normal">사랑스런</strong>
          <p></p>
          <strong className="leading-normal">댕댕이</strong>
          <p className="leading-normal">들을</p>
          <p className="leading-normal">소개합니다!</p>
        </div>
        <div className="flex overflow-hidden mr-12 gap-4">
          {animalToShow.map((animal: any, idx: number) => (
            <IntroduceItem key={idx} animal={animal} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Introduce;
