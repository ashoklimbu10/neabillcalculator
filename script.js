const slabRates = [
  { max: 20, rate: 4 },
  { max: 30, rate: 5 },
  { max: 50, rate: 6.5 },
  { max: 150, rate: 7.5 },
  { max: 250, rate: 8.5 },
  { max: Infinity, rate: 11 }
];

const demandCharge = {
  5: 30,
  15: 80,
  30: 200
};

function calculateBill(units) {
  let remaining = units;
  let total = 0;
  let prevMax = 0;

  for (let slab of slabRates) {
    let slabUnits = Math.min(slab.max - prevMax, remaining);
    total += slabUnits * slab.rate;
    remaining -= slabUnits;
    prevMax = slab.max;
    if (remaining <= 0) break;
  }
  return total;
}

function updateBill() {
  const prev = parseFloat(document.getElementById("prevReading").value) || 0;
  const curr = parseFloat(document.getElementById("currReading").value) || 0;
  const direct = parseFloat(document.getElementById("directUnits").value);
  const amp = parseInt(document.getElementById("ampType").value);

  let units = 0;
  if (!isNaN(direct)) {
    units = direct;
  } else if (!isNaN(curr) && !isNaN(prev)) {
    units = Math.max(curr - prev, 0);
  }

  const energyBill = calculateBill(units);
  const total = energyBill + demandCharge[amp];

  document.getElementById("consumedUnit").textContent = units + ' units';
  document.getElementById("totalBill").textContent = 'Rs. ' + total.toFixed(2);
  document.getElementById("rebateBill").textContent = 'Rs. ' + (total - energyBill * 0.02).toFixed(2);
  document.getElementById("normalBill").textContent = 'Rs. ' + total.toFixed(2);
  document.getElementById("fine10").textContent = 'Rs. ' + (total + energyBill * 0.10).toFixed(2);
  document.getElementById("fine20").textContent = 'Rs. ' + (total + energyBill * 0.20).toFixed(2);
  document.getElementById("fine25").textContent = 'Rs. ' + (total + energyBill * 0.25).toFixed(2);
}