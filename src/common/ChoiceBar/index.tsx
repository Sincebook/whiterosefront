import { observer } from 'mobx-react'
import { useContext } from 'react'
import BarStore from '../../store/BarStore'
import './index.css'

export default observer(function ChoiceBar () {
  const choiceStore = useContext(BarStore)
  const show = { left: choiceStore.choiceBar ? '0': '-50px'}
  const handleSwitch = () => {
    choiceStore.choiceSwitch()
  }
  return (
    <div className="choice-bar" onClick={handleSwitch} style={show}>

    </div>)
})
