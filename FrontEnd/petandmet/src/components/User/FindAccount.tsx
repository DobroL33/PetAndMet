import { useState } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ToggleButton } from '@mui/material'
import FId from './Find/FId'
import FPw from './Find/FPw'

function FindAccount() {
  const [selectedComponent, setSelectedComponent] = useState<String | null>(
    'ID'
  )

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setSelectedComponent(newAlignment)
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4 mt-6">
        <ToggleButtonGroup
          value={selectedComponent}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className="justify-center"
        >
          <ToggleButton value="ID" aria-label="id" className="w-1/2">
            아이디 찾기
          </ToggleButton>
          <ToggleButton value="PW" aria-label="password" className="w-1/2">
            비밀번호 찾기
          </ToggleButton>
        </ToggleButtonGroup>
        {selectedComponent === 'ID' ? <FId /> : <FPw />}
      </div>
    </div>
  )
}

export default FindAccount
