// JavaScript for the Blockchain Explorer page

document.addEventListener('DOMContentLoaded', () => {
  const blockchainTable = document.getElementById('blockchain-data');
  
  // Function to load blockchain data
  async function loadBlockchainData() {
    try {
      const response = await fetchAPI('/getBlockchain');
      
      if (response.success && response.chain && blockchainTable) {
        // Clear loading message
        blockchainTable.innerHTML = '';
        
        if (response.chain.length === 0) {
          blockchainTable.innerHTML = `
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colspan="6">
                No certificates found in the blockchain.
              </td>
            </tr>
          `;
          return;
        }
        
        // Reverse the chain to show newest blocks first
        const blocks = [...response.chain].reverse();
        
        // Generate table rows for each block
        blocks.forEach(block => {
          const row = document.createElement('tr');
          row.className = 'hover:bg-gray-50 transition-colors';
          
          row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              ${block.index}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
              ${block.id}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${block.data.recipient || 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${block.data.course || 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${formatTimestamp(block.timestamp)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="verifyCertificate.html?id=${block.id}" class="text-blue-600 hover:text-blue-900 transition">Verify</a>
            </td>
          `;
          
          blockchainTable.appendChild(row);
        });
      } else {
        throw new Error(response.message || 'Failed to load blockchain data');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      
      if (blockchainTable) {
        blockchainTable.innerHTML = `
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500" colspan="6">
              Error loading blockchain data: ${error.message || 'Unknown error'}
            </td>
          </tr>
        `;
      }
    }
  }
  
  // Load blockchain data on page load
  loadBlockchainData();
});