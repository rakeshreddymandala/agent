import { useState } from 'react'

function QueryForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    mainQuery: '',
    additionalInfo: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Main Query <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="mainQuery"
            value={formData.mainQuery}
            onChange={handleChange}
            className="w-full px-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400"
            placeholder="What would you like me to help you with?"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Information <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400 resize-none"
            placeholder="Any additional context or requirements..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.mainQuery.trim()}
        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 px-4 rounded-xl 
          hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          font-medium text-lg shadow-lg"
      >
        {loading ? 'Processing...' : 'Send Query'}
      </button>
    </form>
  )
}

export default QueryForm
