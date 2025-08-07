import React from 'react'

const ProgressBar = (width) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${width}` }} />
            {/* <div className="text-xs text-gray-700 dark:text-gray-300 mt-1">{width}</div> */}
        </div>
    )
}

export default ProgressBar