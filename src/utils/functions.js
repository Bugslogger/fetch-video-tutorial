/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Object{}} body
 * @returns
 */
export async function FetchDataUsingFetchMethod(url, method, body) {
  if (!url) return { message: "url argument can not be empty." }; // here it will check it user is passing url or not

  /**
   * Here it will will check if the method parameter has string 'GET' or if it is empty/undefined
   * In this both condition it will assume it as GET method.
   *
   * If we pass `POST, PUT` in method parameter then it will ignore below if condition.
   * here i need to make little changes.
   */
  if (method === "GET" || !method || method === "DELETE") {
    const response = await fetch(url, { method: method ? method : "GET" });
    return response.json();
  }

  /**
   * After it ignores above if condition. coz method parameter has something.
   * it will check for body if body is empty or undefined it will return a message telling user to pass body.
   *
   */
  if (!body) {
    return { message: "body can not be empty." };
  }

  /**
   * after user passed the Body it execute the below code and return's fetched data.
   */
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });

  return response.json(); // here it will retun response.
}

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Object{}} header
 * @param {Object{}} body
 *F
 * This function will return promise.
 * now let test it.
 */
export function FetchDataUsingXHR(url, method, body, header) {
  /**
   * this whole code is available on my github you can copy from there
   * [https://github.com/Bugslogger/XMLHttpRequest-cors]
   */

  // I need to return promise here.
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url); // here we have to pass url.
    xhr.responseType = "json"; // here we have to specify the type of response. like in fetch we hav `res.json()`

    // Header section
    if (!header) {
      /**
       * if header parameter is empty then use the below set headers
       */
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("accept", "*/*");
      xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
      xhr.setRequestHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, HEAD, OPTIONS"
      );
    } else {
      //  else set the header passed in parameter.
      xhr.setRequestHeader(header.value, header.content);
    }

    /**
     *
     * @param {any} error
     * @returns
     *
     * while fetch data from API if there there's any error occured below code will execute that condition.
     *
     */
    xhr.onerror = (error) => {
      console.log("Error: ", error);
      reject({ message: error });
    };

    xhr.onloadend = () => {
      // response
      if (xhr.status == 200) {
        resolve({ reponse: xhr.response });
      } else {
        reject({ message: "Failed to fetch data." });
      }
    };
    xhr.send(JSON.stringify(body));
  });

  return promise;
}
