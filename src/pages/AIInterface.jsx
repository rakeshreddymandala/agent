import { useState } from 'react'
import QueryForm from '../components/QueryForm'
import Tabs from '../components/interface/Tabs'
import AdvancedSettings from '../components/interface/AdvancedSettings'
import ResponseArea from '../components/interface/ResponseArea'

function AIInterface() {
  const [loading, setLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [response, setResponse] = useState(null)
  const [activeTab, setActiveTab] = useState('agent')

  const tabs = [
    { id: 'agent', label: 'Agent Settings' },
    { id: 'llm', label: 'LLM Settings' },
    { id: 'history', label: 'History' }
  ]

  const handleQuery = async (formData) => {
    setLoading(true)
    setResponse(null)
    try {
      const response = await fetch('http://localhost:8000/run-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: formData.mainQuery })
      });
      
      const data = await response.json()
      setResponse({
        text: data.message || data.response || 'No response from server',
        timestamp: new Date().toISOString(),
        error: data.status === 'error',
        url: data.url
      })
    } catch (error) {
      setResponse({
        error: true,
        text: 'Failed to connect to the server',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        AI Agent Interface
      </h1>
      
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-6 space-y-6">
        {activeTab === 'agent' && (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
              </button>
            </div>

            {showAdvanced && <AdvancedSettings />}
            <QueryForm onSubmit={handleQuery} loading={loading} />
            <ResponseArea response={response} />
          </>
        )}

        {activeTab === 'llm' && (
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">LLM Configuration</h3>
            {/* LLM settings will go here */}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Query History</h3>
            {/* History will go here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AIInterface
