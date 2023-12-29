import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress, IconButton, Button, } from "@material-tailwind/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import RegisterUser from "@/components/RegisterUser";
import { setHeaderDetails } from "@/store/slice/headerSlice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerService } from "@/services/api.service";
import { setTableData } from "@/store/slice/dashboardSlice";
import NoData from "@/components/NoData";

export function Seller() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const { tabeData } = useSelector((state) => state.dashboard);
  const {search} = useSelector((state)=>state.header)

  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(tabeData, "tabeData==================================");

  useEffect(() => {
    dispatch(setHeaderDetails(pathname))
  }, [])
  const showForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };


  const fetchSeller = () => {
    fetchSellerService().then((res) => {
      console.log(res);
      dispatch(setTableData(res?.data.result))
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchSeller()
  }, [])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex w-full justify-end pb-0">
        <Button
          variant={true ? "text" : "text"}
          onClick={showForm}
          color="blue-grey"
          className="text-blueGray-500 outline border-0 border border-black border-blueGray-500 hover:text-white   text-black  font-bold uppercase text-xs px-4 py-2 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-black "

        >
          Add Seller
        </Button>
      </div>
      <Card>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "email", "phone", "company name", "location", "state", "city", "Approved", "action",].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabeData.filter((item)=>item?.fullName?.toLowerCase().includes(search.toLowerCase())).map(
                ({ fullName, email, phone, isApproved, location, pincode, state, city, companyName }, key) => {
                  const className = `py-3 px-5 ${key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={fullName}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {fullName}
                        </Typography>
                      </td>


                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {companyName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {location}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {state}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {city}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {isApproved ? "Yes" : "No"}
                        </Typography>
                      </td>
                      <td className={`py-3 px-5 ${key === authorsTableData.length - 1
                        ? ""
                        : " border-b border-blue-gray-50  "
                        }`}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs hover:text-green-200 px-2 font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs hover:text-red-200 px-2 font-semibold text-blue-gray-600"
                        >
                          Delete
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
              
              {tabeData.filter((item)=>item?.fullName?.toLowerCase().includes(search.toLowerCase())).length === 0 && <td colSpan={12}><NoData/></td> }
            </tbody>
          </table>
        </CardBody>
      </Card>


      {/* //Form ================================================================================> */}
      {true && (
        <>
          <div className="p-4 xl:ml-80">
            <Modal title="Add Seller" closeForm={closeForm} isFormVisible={isFormVisible} >
              <RegisterUser fetchSeller={fetchSeller} closeForm={closeForm} />
            </Modal>
          </div>
        </>
      )}
      {/* //Form ================================================================================> */}

    </div>
  );
}

export default Seller;
