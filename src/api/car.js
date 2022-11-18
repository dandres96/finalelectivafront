import { basePath, apiVersion } from "./config";


export function getCars() {
  const url = `${basePath}/${apiVersion}/cars`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function deleteCar(carId) {
  const url = `${basePath}/${apiVersion}/deletecar/${carId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function addCarDB(data) {
  const url = `${basePath}/${apiVersion}/addcar`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function editCarDB( car, carId) {
  const url = `${basePath}/${apiVersion}/updatecar/${carId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify(car)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

