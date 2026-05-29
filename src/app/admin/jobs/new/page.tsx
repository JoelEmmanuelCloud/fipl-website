import JobForm from '../JobForm'

export default function NewJobPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Post a Job</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <JobForm />
      </div>
    </div>
  )
}
