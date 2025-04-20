function AdvancedSettings() {
  const browserOptions = [
    { value: 'conservative', label: 'Conservative', description: 'Only click if it\'s 100% sure. No scrolling or guessing.' },
    { value: 'exploratory', label: 'Exploratory', description: 'Will try scrolling pages, exploring links to find answers.' },
    { value: 'fast', label: 'Fast', description: 'Prioritizes speed—clicks first obvious result, doesn\'t wait.' },
    { value: 'thorough', label: 'Thorough', description: 'Reads deeply into pages, even sublinks. Good for research tasks.' },
    { value: 'minimalist', label: 'Minimalist', description: 'Stops browsing once it finds something that might work.' },
    { value: 'interactive', label: 'Interactive', description: 'Requires confirmations before taking major actions.' },
  ]

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Model Temperature
          </label>
          <div className="space-y-1">
            <div className="flex justify-between px-1 text-xs text-gray-400">
              <span>0</span>
              <span>0.4</span>
              <span>0.8</span>
              <span>1.2</span>
              <span>1.6</span>
              <span>2.0</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              className="w-full accent-blue-500"
              defaultValue="0.7"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Browser Behavior
          </label>
          <select className="w-full bg-gray-700 rounded-lg px-3 py-2 text-sm text-white">
            {browserOptions.map(option => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            {browserOptions.find(opt => opt.value === 'conservative')?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSettings
