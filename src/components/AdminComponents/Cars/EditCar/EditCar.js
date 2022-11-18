import { Button, Col, Form, Input, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { editCarDB } from '../../../../api/car';


export default function EditCarForm(props) {
    const { car, setIsVisibleModal, setReloadCars } = props;
    console.log("data original", car)
    const [carData, setCarData] = useState({
        name: car.name,
        motor: car.motor,
        mark: car.mark
    });

    useEffect(() => {
        setCarData({
            name: car.name,
            motor: car.motor,
            mark: car.mark
        })
    }, [car])

    const updateCar = () => {
    console.log(carData);

        let carUpdate = carData
        if (
            !carUpdate.name ||
            !carUpdate.motor ||
            !carUpdate.mark
        ) {
            notification["error"]({
                message:
                    "Todos los campos son obligatorios."
            });
        } else {
            editCarDB(carUpdate, car._id)
                .then(result => {
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadCars(true);
                })
        }
    }

    return (
        <div className="edit-user-form">
            <EditForm
                carData={carData}
                setCarData={setCarData}
                updateCar={updateCar}
            />
        </div>
    )

}

function EditForm(props) {
    const { carData, setCarData, updateCar } = props;
    const [form] = Form.useForm()
    return (
        <Form onFinish={updateCar} form={form}>
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
                >
                    Editar Carro
                </Button>
            </Form.Item>
        </Form>
    )
}