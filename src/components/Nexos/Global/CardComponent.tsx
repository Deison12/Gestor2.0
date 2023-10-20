import React, { FC } from 'react';
import { Card, Popover, OverlayTrigger } from 'react-bootstrap';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface CardProps {
    image: string;
    title: string;
    link: string;
    description: string;
}

const CardComponent: FC<CardProps> = ({ image, title, link, description }) => {
    const popover = (
        <Popover className="popover-primary">
            <Popover.Body>{description}</Popover.Body>
        </Popover>
    );

    return (
        <Card className="bd-0 mg-b-20 text-center shadow-drop-bottom-right">
            <Card.Body className="br-5 bd bd-danger">
                <a href={`${process.env.PUBLIC_URL}/${link}`} className="text-muted">
                    <img src={image} className="w-100" alt="..." />
                    <div className='d-flex align-items-center justify-content-center'>
                        <h5 className="mg-b-10 mg-t-15 tx-18 text-capitalize">{title}</h5>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover}>
                            <span className="">
                                <HelpOutlineIcon style={{ fontSize: '18px', marginTop: '6px', marginLeft: 2 }} />
                            </span>
                        </OverlayTrigger>
                    </div>
                </a>
            </Card.Body>
        </Card>
    );
};

export default CardComponent;
