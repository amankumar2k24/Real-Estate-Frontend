import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress, IconButton, } from "@material-tailwind/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState } from "react";
import Modal from "../../components/Modal";

export function Sellor() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const showForm = () => {
        setIsFormVisible(true);
    };

    const closeForm = () => {
        setIsFormVisible(false);
    };



    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <div className="flex w-full justify-end">
                    <IconButton onClick={showForm}>
                        <i className="fas fa-plus" />
                    </IconButton>
                </div>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["author", "function", "status", "employed", ""].map((el) => (
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
                            {authorsTableData.map(
                                ({ img, name, email, job, online, date }, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={img} alt={name} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {job[0]}
                                                </Typography>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {job[1]}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={online ? "green" : "blue-gray"}
                                                    value={online ? "online" : "offline"}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Edit
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>


            {/* //Form ================================================================================> */}
            {true && (
             <>
              <div className="p-4 xl:ml-80">
             <Modal closeForm={closeForm} isFormVisible={isFormVisible} />
                </div>
             </>
            )}
            {/* //Form ================================================================================> */}

        </div>
    );
}

export default Sellor;
