const table = document.querySelector("#myTable");
let cases = document.querySelector("#Cases");
let a = [];
fetch("https://api.covid19india.org/v2/state_district_wise.json")
  .then(r => r.json())
  .then(d => {
    cases.textContent = Object.values(d)
      .map(p =>
        Object.values(p.districtData).reduce((i, c) => i + c.confirmed, 0)
      )
      .reduce((i, v) => i + v, 0);
    for (let i in d) {
      let b = [];
      for (let j in d[i].districtData) {
        console.log(i);
        b.push(d[i].districtData[j].confirmed);
      }
      a.push({
        state: d[i].state,
        cases: b.reduce((a, b) => a + b)
      });
    }
    a = a.sort((a, b) => a.cases - b.cases).reverse();
    for (let i in a) {
      table.innerHTML += `
    <tr>
      <td>${a[i].state}</td>
      <td>${a[i].cases}</td>
      
    </tr>
  `;
    }
  });

fetch("https://api.covid19india.org/data.json")
  .then(r => r.json())
  .then(d => {
    let ee = d.cases_time_series;
    const arrSum = ee => ee.reduce((a, b) => a + b, 0);

    for (let i in ee) {
      let b = [];
      for (let j in ee[i].totalrecovered) {
        b = i;
      }
    }
  });


function dark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}