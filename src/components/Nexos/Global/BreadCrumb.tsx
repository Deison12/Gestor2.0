import React from "react";
import { Breadcrumb } from "react-bootstrap";

interface BreadCrumbProps {
    items: string[];
    baseURL: string[];
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, baseURL }) => {
    
    if (!Array.isArray(items) || items.length === 0 || !Array.isArray(baseURL) || baseURL.length !== items.length) {
        return null; // Return null if the items array is empty, baseURL is not an array, or the lengths of items and baseURL don't match
    }
    return (
        <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
                {/*<span className="main-content-title mg-b-0 mg-b-lg-1">EMPTY PAGE</span>*/}
                <div className="main-img-user avatar-lg">
                    <img
                        alt="avatar"
                        className="rounded-circle"
                        src={require("../../../assets/img/brand/logo-nexos2.png")}
                    />
                </div>
            </div>
            <div className="justify-content-center mt-3 align-items-center">
                <Breadcrumb className="breadcrumb">
                    {items.map((item, index) => (
                        <Breadcrumb.Item
                            key={index}
                            href={
                                index === items.length - 1
                                    ? undefined
                                    : `${process.env.PUBLIC_URL}/${baseURL[index].toLowerCase()}`
                            }
                            className={
                                index === items.length - 1
                                    ? "breadcrumb-item active"
                                    : "breadcrumb-item tx-15"
                            }
                            active={index === items.length - 1}
                            aria-current={index === items.length - 1 ? "page" : undefined}
                        >
                            {item.toUpperCase()}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        </div>
    );
};
