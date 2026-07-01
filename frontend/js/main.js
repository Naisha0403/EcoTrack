var EMISSION_FACTORS = {
  'Car (petrol)':              0.21,
  'Car (diesel)':              0.17,
  'Flight (short-haul)':       0.255,
  'Bus':                       0.089,
  'Train':                     0.041,
  'Motorcycle':                0.114,
  'Beef meal':                 6.0,
  'Chicken meal':              1.1,
  'Vegetarian meal':           0.5,
  'Vegan meal':                0.3,
  'Fish meal':                 1.3,
  'Electricity (1 kWh)':       0.233,
  'Gas (1 unit)':              2.04,
  'Air conditioning (1 hour)': 0.8,
  'New clothing item':         10.0,
  'Electronic device':         70.0,
  'Plastic bottle':            0.08,
  'Landfill waste (1 kg)':     0.5,
  'Recycled waste (1 kg)':     0.02
};

var CATEGORY_ACTIVITIES = {
  'Transport':   ['Car (petrol)','Car (diesel)','Flight (short-haul)','Bus','Train','Motorcycle'],
  'Food':        ['Beef meal','Chicken meal','Vegetarian meal','Vegan meal','Fish meal'],
  'Home Energy': ['Electricity (1 kWh)','Gas (1 unit)','Air conditioning (1 hour)'],
  'Shopping':    ['New clothing item','Electronic device','Plastic bottle'],
  'Waste':       ['Landfill waste (1 kg)','Recycled waste (1 kg)']
};

var myChart = null;

document.addEventListener('DOMContentLoaded', function() {
    var addActivitySection = document.getElementById('add-activity');
    addActivitySection.innerHTML = `
      <h2>Add Activity</h2>
      <div class="form-card">
        <form id="activity-form">
          <label for="category">Activity Category</label>
          <select id="category">
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Home Energy">Home Energy</option>
            <option value="Shopping">Shopping</option>
            <option value="Waste">Waste</option>
          </select>
          
          <label for="activity-type">Specific Activity</label>
          <select id="activity-type"></select>
          
          <label for="quantity">Quantity (km / meals / kWh / items / kg)</label>
          <input type="number" id="quantity">
          
          <label for="log-date">Date</label>
          <input type="date" id="log-date">
          
          <button type="submit" class="btn-primary" style="width: 100%;">Log Activity</button>
          <div id="form-feedback"></div>
        </form>
      </div>
    `;

    var dateInput = document.getElementById('log-date');
    var todayDate = new Date();
    var y = todayDate.getFullYear();
    var m = todayDate.getMonth() + 1;
    var d = todayDate.getDate();
    if (m < 10) { m = '0' + m; }
    if (d < 10) { d = '0' + d; }
    var todayString = y + '-' + m + '-' + d;
    dateInput.value = todayString;

    var selectCategory = document.getElementById('category');
    var selectType = document.getElementById('activity-type');
    
    var firstCat = CATEGORY_ACTIVITIES['Transport'];
    selectType.innerHTML = '';
    for (var i = 0; i < firstCat.length; i++) {
        var opt = document.createElement('option');
        opt.value = firstCat[i];
        opt.textContent = firstCat[i];
        selectType.appendChild(opt);
    }

    selectCategory.addEventListener('change', function() {
        var val = selectCategory.value;
        var arr = CATEGORY_ACTIVITIES[val];
        selectType.innerHTML = '';
        for (var j = 0; j < arr.length; j++) {
            var o = document.createElement('option');
            o.value = arr[j];
            o.textContent = arr[j];
            selectType.appendChild(o);
        }
    });

    document.getElementById('activity-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        var cat = document.getElementById('category').value;
        var type = document.getElementById('activity-type').value;
        var qty = parseFloat(document.getElementById('quantity').value);
        var dt = document.getElementById('log-date').value;
        var feed = document.getElementById('form-feedback');

        if (qty > 0) {
            var co2Value = EMISSION_FACTORS[type] * qty;
            var finalCo2 = parseFloat(co2Value.toFixed(3));
            var myData = { date: dt, category: cat, activityType: type, quantity: qty, co2: finalCo2 };
            
            try {
                var response = await fetch('/api/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(myData)
                });
                
                if (response.ok) {
                    feed.className = 'feedback-success';
                    feed.style.display = 'block';
                    feed.textContent = '✅ Logged! You emitted ' + finalCo2 + ' kg CO₂ from ' + type + '.';
                    setTimeout(function() { feed.style.display = 'none'; }, 5000);
                    
                    document.getElementById('activity-form').reset();
                    document.getElementById('log-date').value = todayString;
                    var tCat = CATEGORY_ACTIVITIES['Transport'];
                    selectType.innerHTML = '';
                    for (var k = 0; k < tCat.length; k++) {
                        var o2 = document.createElement('option');
                        o2.value = tCat[k];
                        o2.textContent = tCat[k];
                        selectType.appendChild(o2);
                    }
                    
                    setTimeout(function() {
                        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
                        renderDashboard();
                    }, 300);
                } else {
                    feed.className = 'feedback-error';
                    feed.style.display = 'block';
                    feed.textContent = 'Oops! Looks like the server is taking a nap. Is it running?';
                    setTimeout(function() { feed.style.display = 'none'; }, 5000);
                }
            } catch (err) {
                feed.className = 'feedback-error';
                feed.style.display = 'block';
                feed.textContent = 'Oops! Looks like the server is taking a nap. Is it running?';
                setTimeout(function() { feed.style.display = 'none'; }, 5000);
            }
        } else {
            feed.className = 'feedback-error';
            feed.style.display = 'block';
            feed.textContent = 'Please enter a valid quantity greater than 0. No free passes!';
            setTimeout(function() { feed.style.display = 'none'; }, 5000);
        }
    });

    var tipsSection = document.getElementById('tips');
    tipsSection.innerHTML = `
      <h2>Eco Tips to Reduce Your Footprint</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">🚶</div>
          <h3>Walk or Cycle Short Trips</h3>
          <p>Replacing a 5 km petrol car trip daily with walking or cycling eliminates roughly 5.25 kg CO₂ per week. Short trips under 3 km are the easiest wins.</p>
          <span class="tip-saving">Saves ~5.3 kg CO₂/week</span>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🥗</div>
          <h3>Eat Less Red Meat</h3>
          <p>Swapping 3 beef meals per week for vegetarian saves over 16 kg CO₂. Legumes, tofu, and eggs are high-protein, low-emission options.</p>
          <span class="tip-saving">Saves ~16.5 kg CO₂/week</span>
        </div>
        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <h3>Unplug Idle Appliances</h3>
          <p>Devices on standby draw power continuously. Switching off TVs, chargers, and lights when leaving a room reduces your home energy footprint.</p>
          <span class="tip-saving">Saves ~1.2 kg CO₂/week</span>
        </div>
        <div class="tip-card">
          <div class="tip-icon">👕</div>
          <h3>Avoid Fast Fashion</h3>
          <p>A single new clothing item averages 10 kg CO₂ to produce. Buying second-hand or extending garment life dramatically cuts this number.</p>
          <span class="tip-saving">Saves ~10 kg CO₂/item</span>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🧴</div>
          <h3>Use a Reusable Bottle and Bag</h3>
          <p>One plastic bottle emits ~0.08 kg CO₂. A reusable bottle and tote bag prevent dozens of single-use items every month.</p>
          <span class="tip-saving">Saves ~1.6 kg CO₂/month</span>
        </div>
        <div class="tip-card">
          <div class="tip-icon">♻️</div>
          <h3>Separate and Recycle</h3>
          <p>Recycled waste emits 96% less CO₂ than landfill per kilogram. Separate paper, plastic, metal, and glass before disposal.</p>
          <span class="tip-saving">Saves ~0.48 kg CO₂/kg</span>
        </div>
      </div>
    `;

    var aboutSection = document.getElementById('about');
    aboutSection.innerHTML = `
      <h2>About EcoTrack</h2>
      <h3>About SDG 13: Climate Action</h3>
      <p>The United Nations SDG 13 calls for urgent action to combat climate change, limit global temperature rise to 1.5°C, build climate resilience, and integrate climate measures into national policies.</p>
      <h3>About EcoTrack</h3>
      <p>EcoTrack is a full-stack web application that lets individuals log daily activities across five categories, calculates their CO₂ emissions using standardised emission factors, and displays personal stats on a live dashboard. Data is stored securely on the server.</p>
      <div class="about-stats">
        <div class="about-stat">
          <span class="about-num">1.9t</span>
          <p>Average CO₂ per person per year in India (World Bank, 2023)</p>
        </div>
        <div class="about-stat">
          <span class="about-num">16%</span>
          <p>Share of global emissions from transport (IEA, 2023)</p>
        </div>
        <div class="about-stat">
          <span class="about-num">73%</span>
          <p>Possible food emission cut from plant-based diet (Poore & Nemecek, 2018)</p>
        </div>
      </div>
    `;

    var dashboardSection = document.getElementById('dashboard');
    dashboardSection.innerHTML = `
      <h2>Dashboard</h2>
      <div class="stats-grid">
        <div class="stat-card"><span class="stat-value" id="stat-today">0.00</span><p>Today's Emissions (kg CO₂)</p></div>
        <div class="stat-card"><span class="stat-value" id="stat-week">0.00</span><p>This Week (kg CO₂)</p></div>
        <div class="stat-card"><span class="stat-value" id="stat-total">0.00</span><p>Total Logged (kg CO₂)</p></div>
      </div>
      <h3>Last 7 Days</h3>
      <canvas id="weeklyChart"></canvas>
      <h3>Recent Activities</h3>
      <div id="empty-state" style="display:none;padding:1rem;color:#798b84">No activities logged yet. Add your first activity above!</div>
      <table id="activity-table"><thead><tr><th>Date</th><th>Category</th><th>Activity</th><th>Qty</th><th>CO₂ (kg)</th></tr></thead><tbody id="activity-tbody"></tbody></table>
      <button id="clear-btn">Clear All Data</button>
    `;

    var clearBtnElement = document.getElementById('clear-btn');
    if (clearBtnElement) {
      clearBtnElement.addEventListener('click', async function() {
        if (window.confirm('Delete all logged activities? This cannot be undone.')) {
          try {
            var response = await fetch('/api/activities', { method: 'DELETE' });
            if (response.ok) {
              setTimeout(function() { renderDashboard(); }, 100);
            }
          } catch (err) {
            alert("Couldn't clear data. Is the server running?");
          }
        }
      });
    }

    renderDashboard();

});

async function renderDashboard() {
    try {
        var response = await fetch('/api/activities');
        var entries = [];
        if (response.ok) {
            entries = await response.json();
        }
        
        var emptyState = document.getElementById('empty-state');
        var activityTable = document.getElementById('activity-table');
        var clearBtn = document.getElementById('clear-btn');
        
        if (entries.length == 0) {
            emptyState.style.display = 'block';
            activityTable.style.display = 'none';
            if (clearBtn) { clearBtn.style.display = 'none'; }
            
            document.getElementById('stat-today').textContent = '0.00';
            document.getElementById('stat-week').textContent = '0.00';
            document.getElementById('stat-total').textContent = '0.00';
            if (myChart != null) {
                myChart.destroy();
                myChart = null;
            }
        } else {
            emptyState.style.display = 'none';
            activityTable.style.display = 'table';
            if (clearBtn) { clearBtn.style.display = 'block'; }
            
            var todayDate = new Date();
            var y1 = todayDate.getFullYear();
            var m1 = todayDate.getMonth() + 1;
            var d1 = todayDate.getDate();
            if (m1 < 10) { m1 = '0' + m1; }
            if (d1 < 10) { d1 = '0' + d1; }
            var todayStr = y1 + '-' + m1 + '-' + d1;
            
            var pastDate = new Date();
            pastDate.setTime(todayDate.getTime() - (6 * 86400000));
            var y2 = pastDate.getFullYear();
            var m2 = pastDate.getMonth() + 1;
            var d2 = pastDate.getDate();
            if (m2 < 10) { m2 = '0' + m2; }
            if (d2 < 10) { d2 = '0' + d2; }
            var sevenDaysAgo = y2 + '-' + m2 + '-' + d2;
            
            var todayTotal = 0;
            var weekTotal = 0;
            var grandTotal = 0;
            
            for (var index1 = 0; index1 < entries.length; index1++) {
                var itm1 = entries[index1];
                if (itm1.date == todayStr) {
                    todayTotal = todayTotal + itm1.co2;
                }
                if (itm1.date >= sevenDaysAgo) {
                    weekTotal = weekTotal + itm1.co2;
                }
                grandTotal = grandTotal + itm1.co2;
            }
            
            document.getElementById('stat-today').textContent = todayTotal.toFixed(2);
            document.getElementById('stat-week').textContent = weekTotal.toFixed(2);
            document.getElementById('stat-total').textContent = grandTotal.toFixed(2);
            
            var dateLabels = [];
            var rawDateLabels = [];
            var chartData = [];
            
            for (var index2 = 0; index2 < 7; index2++) {
                var tempD = new Date();
                tempD.setTime(todayDate.getTime() - ((6 - index2) * 86400000));
                
                var yt = tempD.getFullYear();
                var mt = tempD.getMonth() + 1;
                var ddt = tempD.getDate();
                if (mt < 10) { mt = '0' + mt; }
                if (ddt < 10) { ddt = '0' + ddt; }
                var strt = yt + '-' + mt + '-' + ddt;
                
                rawDateLabels.push(strt);
                
                var options = { year: 'numeric', month: 'short', day: 'numeric' };
                try {
                    dateLabels.push(tempD.toLocaleDateString(undefined, options));
                } catch(e) {
                    dateLabels.push(strt);
                }
                
                var dailyCo2 = 0;
                for (var index3 = 0; index3 < entries.length; index3++) {
                    if (entries[index3].date == strt) {
                        dailyCo2 = dailyCo2 + entries[index3].co2;
                    }
                }
                chartData.push(dailyCo2);
            }
            
            if (myChart != null) {
                myChart.destroy();
                myChart = null;
            }
            
            myChart = new Chart(document.getElementById('weeklyChart'), {
              type: 'bar',
              data: {
                labels: dateLabels,
                datasets: [{
                  label: 'CO₂ (kg)',
                  data: chartData,
                  backgroundColor: '#52b788',
                  borderRadius: 6
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'kg CO₂' }
                  }
                }
              }
            });
            
            var recentHTML = "";
            var startIdx = entries.length - 1;
            var endIdx = entries.length - 10;
            if (endIdx < 0) { endIdx = 0; }
            
            for (var index4 = startIdx; index4 >= endIdx; index4--) {
                var eItem = entries[index4];
                var fDate = eItem.date;
                try {
                    var options2 = { year: 'numeric', month: 'short', day: 'numeric' };
                    fDate = new Date(eItem.date).toLocaleDateString(undefined, options2);
                } catch(e) {}
                
                recentHTML = recentHTML + "<tr><td>" + fDate + "</td><td>" + eItem.category + "</td><td>" + eItem.activityType + "</td><td>" + eItem.quantity + "</td><td>" + eItem.co2 + "</td></tr>";
            }
            document.getElementById('activity-tbody').innerHTML = recentHTML;
        }
    } catch (e) {
    }
}
