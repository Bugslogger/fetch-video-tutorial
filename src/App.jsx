import { useState, useEffect, useDeferredValue } from "react";
import {
  FetchDataUsingFetchMethod,
  FetchDataUsingXHR,
} from "./utils/functions";

function App() {
  const [data, setdata] = useState([]);
  const res = useDeferredValue(data);

  /**
   * here In function argumnt pass the url.
   * I will fetch data on load and for that we need `useEffect` hook.
   */

  // useEffect(() => {
  //   // now here `FetchDataUsingFetchMethod()` method will return promise

  //   // asa you can see it returns promise
  //   // here we have to option we can use then().catch() OR async await
  //   // we will see both

  //   // using then().catch()
  //   FetchDataUsingFetchMethod("https://jsonplaceholder.typicode.com/todos")
  //     .then((data) => {
  //       // here it returns data/response
  //       // setdata(data);
  //       // now it returning 200 data in array
  //       //  I will map it in table.

  //       setdata(data);
  //       // console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [data]);

  // here i will create a async function

  // const getData = async () => {
  //   const response = await FetchDataUsingFetchMethod(
  //     "https://jsonplaceholder.typicode.com/todos"
  //   );
  //   console.log(response);
  //   setdata(response);
  // };

  /**
   * Both then().catch() and async/await will return you same data.
   * it depends on you/ your use case which one you want to use in your application.
   */

  // useEffect(() => {
  //   // call `getData()` on page load
  //   getData();
  // }, []);

  /**
   * POST method
   */
  const postData = () => {
    // FetchDataUsingFetchMethod(
    //   "https://jsonplaceholder.typicode.com/posts",
    //   "POST",
    //   {
    //     id: 123,
    //     title: "bugslogger",
    //     body: "fetch api data video.",
    //     userId: 23456,
    //   }
    // )
    //   .then((res) => {
    //     console.log("post data: ", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // XHR
    // I think i have to pass header here.
    /**
     * here it is working perfectly. but it logging error message in console coz this API is not returning status code 200.
     * otherwise it is working perfect.
     *
     * now we move to next method that is DELETE.
     */
    FetchDataUsingXHR(
      "https://jsonplaceholder.typicode.com/posts",
      "POST",
      {
        id: 123,
        title: "bugslogger",
        body: "fetch api data video.",
        userId: 23456,
      },
      {
        value: "Access-Control-Allow-Origin",
        content: "*",
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET method
  const getData = async () => {
    // we have to specify id
    // now let try to get data with 23456 userId.

    // const res = await FetchDataUsingFetchMethod(
    //   "https://jsonplaceholder.typicode.com/posts/23456"
    // );

    FetchDataUsingXHR("https://jsonplaceholder.typicode.com/posts/2", "GET")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * PUT method
   */
  const putData = () => {
    // here id is missing
    FetchDataUsingFetchMethod(
      "https://jsonplaceholder.typicode.com/posts/1",
      "PUT",
      {
        id: 1,
        title: "bugslogger",
        body: "fetch api data video.",
        userId: 1,
      }
    )
      .then((res) => {
        console.log("put data: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE method
  const deleteData = async () => {
    // we have to specify id
    // now let try to get data with 23456 userId.

    // const res = await FetchDataUsingFetchMethod(
    //   "https://jsonplaceholder.typicode.com/posts/1",
    //   "DELETE"
    // );
    // console.log(res);

    FetchDataUsingXHR("https://jsonplaceholder.typicode.com/posts/3", "DELETE")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container h-100 py-5">
      <h2 className="text-center">Fetch Data From API's</h2>
      <div className="my-5">
        <button onClick={getData} className="btn btn-primary mx-2 ">
          GET
        </button>
        <button onClick={postData} className="btn btn-success mx-2">
          POST
        </button>
        <button onClick={putData} className="btn btn-warning mx-2">
          PUT
        </button>
        <button onClick={deleteData} className="btn btn-danger mx-2">
          Delete
        </button>
      </div>
      <div className="my-5 px-5">
        {/* i will copy table from bootstrap and paste it here.  */}
        <table
          className="table table-striped mx-auto"
          style={{ width: "500px" }}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">USER ID</th>
            </tr>
          </thead>
          <tbody>
            {res.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value?.id}</td>
                  <td>{value?.title}</td>
                  <td>{value?.userId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
