function ResponseArea({ response }) {
  if (!response) return null

  return (
    <div className="mt-6 bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Response</h3>
        {response.timestamp && (
          <span className="text-sm text-gray-400">
            {new Date(response.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="prose prose-invert max-w-none">
        {response.error ? (
          <p className="text-red-400">{response.error}</p>
        ) : (
          <p>{response.text}</p>
        )}
      </div>
    </div>
  )
}

export default ResponseArea
