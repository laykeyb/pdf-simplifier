import HistoryDisplay from "@/components/simplify/history-display"

const page = () => {
  return (
    <div className="container mx-auto px-8">
      <h1 className='lg:text-4xl text-xl mx-auto text-center mb-8'>History</h1>
      <HistoryDisplay/>
    </div>
  )
}
export default page