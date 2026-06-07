import { EssayGradingPanel } from '../../components/teacher/EssayGradingPanel'
import { essayTask } from '../../data/mockData'
import { useParams } from 'react-router-dom'

export function EssayGradingPage() {
  const { id } = useParams()
  const showAiChecked = id === 'checked'

  return <EssayGradingPanel task={essayTask} showAiChecked={showAiChecked} />
}
