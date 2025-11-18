// MINIMAL FIX - Just replace your connectOllama() function with this:

async function connectOllama() {
    log('Connecting to Ollama...', 'info');
    
    try {
        const response = await fetch('/api/ollama/connect', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            log('Ollama connected! Found ' + data.models.length + ' models', 'info');
            
            // Safely update ollama-models if it exists
            const modelsDiv = document.getElementById('ollama-models');
            if (modelsDiv) {
                const modelsList = data.models.map(m => m.name).join(', ');
                modelsDiv.innerHTML = `
                    <strong>Connected</strong><br>
                    Models: ${modelsList}
                `;
            }
            
            // Try to update status (if element exists)
            const statusDiv = document.getElementById('ollama-connection-status');
            if (statusDiv) {
                statusDiv.innerHTML = `
                    <div style="color: #0f0;">✅ Connected to Ollama</div>
                    <div style="font-size: 11px;">${data.models.length} models available</div>
                `;
            }
            
            // Try to show models list (if element exists)
            const modelsList = document.getElementById('ollama-models-list');
            if (modelsList) {
                modelsList.style.display = 'block';
            }
            
            // Success!
            console.log('✅ Ollama connected successfully:', data.models);
            
        } else {
            throw new Error(data.error || 'Connection failed');
        }
    } catch (error) {
        log('Ollama connection failed: ' + error.message, 'error');
        console.error('Ollama error:', error);
        
        // Try to update status (if element exists)
        const statusDiv = document.getElementById('ollama-connection-status');
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div style="color: #ff0;">⚠️ Connection Failed</div>
                <div style="font-size: 11px;">${error.message}</div>
            `;
        }
    }
}
