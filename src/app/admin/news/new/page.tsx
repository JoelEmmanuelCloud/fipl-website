import ArticleForm from '../ArticleForm'

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Article</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ArticleForm />
      </div>
    </div>
  )
}
