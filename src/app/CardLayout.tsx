import React from 'react';

interface CardLayoutProps {
  onSelectStyle: (style: 'classic' | 'receipt' | 'terminal') => void;
  selectedStyle?: 'classic' | 'receipt' | 'terminal';
}

const CardLayout: React.FC<CardLayoutProps> = ({ onSelectStyle, selectedStyle = 'classic' }) => {
  return (
    <div className="flex flex-col space-y-6 p-4 max-w-xl mx-auto">
			<p className="font-bold text-lg">Choose your Layout</p>
      <div 
        className={`cursor-pointer transition-all ${selectedStyle === 'classic' ? 'border-l-4 border-blue-500 pl-2' : 'hover:bg-gray-50'}`}
        onClick={() => onSelectStyle('classic')}
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 p-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-400"></div>
              <div className="ml-3">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                <div className="h-3 w-20 bg-gray-400 rounded mt-1"></div>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div className="h-2 w-full bg-gray-200 rounded mb-3"></div>
            
            <div className="flex justify-between mb-3">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
            
            <div className="h-8 w-full bg-gray-800 rounded"></div>
          </div>
          <div className="text-center py-2 text-sm font-medium">Classic</div>
        </div>
      </div>
      
      {/* Receipt Style */}
      <div 
        className={`cursor-pointer transition-all ${selectedStyle === 'receipt' ? 'border-l-4 border-blue-500 pl-2' : 'hover:bg-gray-50'}`}
        onClick={() => onSelectStyle('receipt')}
      >
        <div className="bg-white border border-gray-200 p-4 shadow-md">
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-2 mb-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-gray-800 mb-1"></div>
            <div className="h-4 w-32 bg-gray-800 rounded mx-auto"></div>
            <div className="h-2 w-24 bg-gray-400 rounded mx-auto mt-1"></div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <div className="h-3 w-12 bg-gray-400 rounded"></div>
              <div className="h-3 w-16 bg-gray-600 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-12 bg-gray-400 rounded"></div>
              <div className="h-3 w-16 bg-gray-600 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-12 bg-gray-400 rounded"></div>
              <div className="h-3 w-16 bg-gray-600 rounded"></div>
            </div>
          </div>
          
          <div className="border-t-2 border-dashed border-gray-300 pt-2 text-center">
            <div className="h-2 w-36 bg-gray-400 rounded mx-auto"></div>
          </div>
          <div className="text-center py-2 text-sm font-medium">Receipt</div>
        </div>
      </div>
      
      <div 
        className={`cursor-pointer transition-all ${selectedStyle === 'terminal' ? 'border-l-4 border-blue-500 pl-2' : 'hover:bg-gray-50'}`}
        onClick={() => onSelectStyle('terminal')}
      >
        <div className="bg-gray-900 rounded-md shadow-xl p-4 border border-green-500">
          <div className="flex items-center mb-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-3 h-2 w-24 bg-green-300 rounded"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="h-2 w-3 bg-purple-400 rounded mr-1"></div>
              <div className="h-2 w-20 bg-green-500 rounded"></div>
            </div>
            <div className="ml-4">
              <div className="h-2 w-24 bg-green-500 rounded mb-1"></div>
              <div className="h-2 w-32 bg-green-500 rounded mb-1"></div>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-3 bg-purple-400 rounded mr-1"></div>
              <div className="h-2 w-20 bg-green-500 rounded"></div>
            </div>
            <div className="ml-4">
              <div className="h-2 w-24 bg-green-500 rounded mb-1"></div>
              <div className="h-2 w-24 bg-green-500 rounded mb-1"></div>
              <div className="h-2 w-24 bg-green-500 rounded mb-1"></div>
            </div>
          </div>
          <div className="text-center py-2 text-sm font-medium text-white">Terminal</div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;