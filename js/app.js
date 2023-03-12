// load data from api
const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayTools(data.data);
};

// display data from api
const displayTools = (tools) => {
  // console.log(tools);
  const toolsContainer = document.getElementById("tools-container");
  tools.tools.forEach((tool) => {
    // console.log(tool);
    const toolDiv = document.createElement("div");
    toolDiv.classList.add("col");
    toolDiv.innerHTML = `
    <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol>
              <li>${tool.features[0]}</li>
              <li>${tool.features[1]}</li>
              <li>${tool.features[2]}</li>
            </ol>
        </div>
        <div class=" d-flex justify-content-between align-items-center card-footer">
            <div>
               <h5 class="card-title">${tool.name}</h5>
               <p id="date">${tool.published_in}</p>
            </div>
            <div>
            <button onclick="loadDataDetails('${tool.id}')"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#toolDetailsModal">Show Details</button>
            </div>
        </div>
    </div>
    `;
    toolsContainer.appendChild(toolDiv);
  });
  //   stop loader
  toggleSpinner(false);
};

// spin loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadDataDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayToolsDetails(data.data);
};

const displayToolsDetails = (tool) => {
  // console.log(tool);
  const modalBody = document.getElementById("tool-details");
  modalBody.innerHTML = `
    <div class="p-3 d-flex gap-5 justify-content-between">
      <div class="p-3 rounded border bg-danger bg-opacity-10 border-danger ">
        <h5>${tool.description ? tool.description : "No data found!"}</h5>
        <div class="d-flex gap-5 justify-content-between">
          <div class="text-success bg-white">
            <p>${tool.pricing[0].price ? tool.pricing[0].price : "No data found!"}</p>
          </div>
          <div class="text-danger bg-white">
          <p>${tool.pricing[1].price ? tool.pricing[1].price : "No data found!"}</p>
          </div>
          <div class="text-warning bg-white">
          <p>${tool.pricing[2].price ? tool.pricing[2].price : "No data found!"}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <h5>Features</h5>
            <ul>
              <li>${tool.features[1] ? tool.features[1].feature_name : "No data found!"}</li>
              <li>${tool.features[2] ? tool.features[2].feature_name : "No data found!"}</li>
              <li>${tool.features[3] ? tool.features[3].feature_name : "No data found!"}</li>
            </ul>
          </div>
          <div>
            <h5>Integrations</h5>
            <ul>
              <li>${tool.integrations[0] ? tool.integrations[0] : "No data found!"}</li>
              <li>${tool.integrations[1] ? tool.integrations[1] : "No data found!"}</li>
              <li>${tool.integrations[2] ? tool.integrations[2] : "No data found!"}</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div class="position-relative">
        <img src="${tool.image_link[0] ? tool.image_link[0] : "No Image Found!"}" class="w-100 rounded " alt="">
        <p class="bg-danger w-50 text-center rounded text-white position-absolute top-0 end-0">${
          tool.accuracy.score ? tool.accuracy.score : "No"
        }% accuracy</p>
        </div>
        <div>
          <h5 class="text-center mt-5">${
            tool.input_output_examples[0].input ? tool.input_output_examples[0].input : "No data found!"
          }</h5>
          <p class="text-center mt-2">${
            tool.input_output_examples[0].output ? tool.input_output_examples[0].output : "No data found!"
          }</p>
        </div>
      </div>
  </div>
    `;
};
// start loading
toggleSpinner(true);
loadData();
loadDataDetails();
