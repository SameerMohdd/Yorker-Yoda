// Test script to verify if the fix works
document.addEventListener('DOMContentLoaded', function() {
    console.log("Testing data integration fix...");
    
    // Test if the data integration works
    if (typeof window.pslDataIntegration === 'function' || 
        (window.pslDataIntegration && typeof window.pslDataIntegration.integrate === 'function')) {
        
        try {
            // Call the integration function
            if (typeof window.pslDataIntegration === 'function') {
                window.pslDataIntegration();
            } else {
                window.pslDataIntegration.integrate();
            }
            
            console.log("Data integration function called successfully!");
        } catch (error) {
            console.error("Error calling data integration function:", error);
        }
    } else {
        console.error("Data integration function not found in global scope");
    }
    
    // Check if window.pslData exists after initialization
    setTimeout(() => {
        if (window.pslData) {
            console.log("window.pslData initialized successfully:", window.pslData);
        } else {
            console.error("window.pslData not initialized!");
        }
        
        if (window.allMatches) {
            console.log("window.allMatches initialized successfully:", window.allMatches);
        } else {
            console.error("window.allMatches not initialized!");
        }
    }, 1000);
});
