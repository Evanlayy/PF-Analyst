// Add debug logging
console.log('Script loaded');

// Initialize charts with empty data
let priceChart = null;
let distributionChart = null;

function initializeCharts() {
    console.log('Initializing charts...');
    
    try {
        // Get canvas elements
        const priceCanvas = document.getElementById('priceChart');
        const distributionCanvas = document.getElementById('distributionChart');
        
        console.log('Price canvas:', priceCanvas);
        console.log('Distribution canvas:', distributionCanvas);

        if (!priceCanvas || !distributionCanvas) {
            console.error('Canvas elements not found');
            return;
        }

        // Basic price chart
        priceChart = new Chart(priceCanvas, {
            type: 'line',
            data: {
                labels: ['0min', '30min', '60min', '90min', '120min'],
                datasets: [{
                    label: 'Volume',
                    data: [0, 5, 13, 17, 14.7],
                    borderColor: '#007bff',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Distribution Chart
        const distributionCtx = document.getElementById('distributionChart').getContext('2d');
        new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Large Holders (≥1%) - 8 wallets',
                    'Medium Holders (≥0.4%) - 30 wallets',
                    'Small Holders (<0.4%) - 8,922 wallets'
                ],
                datasets: [{
                    data: [8, 30, 8922],
                    backgroundColor: ['#2ecc71', '#3498db', '#9b59b6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${value.toLocaleString()} wallets (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        console.log('Charts created successfully');
    } catch (error) {
        console.error('Error creating charts:', error);
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    // Add a small delay to ensure everything is ready
    setTimeout(initializeCharts, 500);
});
