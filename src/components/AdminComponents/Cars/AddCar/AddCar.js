import { Button, Col, Form, Input, notification, Row } from 'antd';
import React, { useState } from 'react'
import { addCarDB } from '../../../../api/car';


export default function EditCar(props) {
    const { setIsVisibleModal, setReloadCars } = props;
    const [carData, setCarData] = useState({});

    const addCar = (event) => {
        event.preventDefault();
        if (
            !carData.name ||
            !carData.motor ||
            !carData.mark
        ) {
            notification["error"]({
                message: "Todos los campos son obligatorios.",
            });
        } else {
            addCarDB(carData)
                .then((response) => {
                    notification["success"]({
                        message: response,
                    });
                    setIsVisibleModal(false);
                    setReloadCars(true);
                    setCarData({});
                })
                .catch((err) => {
                    notification["error"]({
                        message: err,
                    });
                });
        }
    }
    return (
        <div className="add-user-form">
            <AddForm
                carData={carData}
                setCarData={setCarData}
                addCar={addCar}
            />
        </div>
    )
}

const AddForm = (props) => {
    const { carData, setCarData, addCar } = props;
    return(
        <Form>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Nombre"
                        value={carData.name}
                        onChange={(e) =>
                          setCarData({ ...carData, name: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Motor"
                        value={carData.motor}
                        onChange={(e) =>
                          setCarData({ ...carData, motor: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Marca"
                        value={carData.mark}
                        onChange={(e) =>
                          setCarData({ ...carData, mark: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addCar}
        >
          Crear Carro
        </Button>
      </Form.Item>
    </Form>
    )
}
