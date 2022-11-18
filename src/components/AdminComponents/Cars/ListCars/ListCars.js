import { Button, List, notification, Modal as ModalAntd } from 'antd';
import React, { useState } from 'react';
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined
} from "@ant-design/icons";
import { deleteCar } from '../../../../api/car';
import AddCarForm from "../AddCar";
import EditCarForm from "../EditCar";
import Modal from "../../../Modal";



const { confirm } = ModalAntd;


export default function ListCars(props) {
  const { cars, setReloadCars } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addCarModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Nuevo carro");
    setModalContent(
      <AddCarForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCars={setReloadCars}
      />
    );
  };
  return (
    <div>
      <List.Item
        actions={[
          <Button type="primary" onClick={addCarModal}>
            <PlusOutlined />
          </Button>,
        ]}>
      </List.Item>
      <CarsList
        cars={cars}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCars={setReloadCars}
      />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  )
}
function CarsList(props) {
  const {
    cars,
    setReloadCars,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const editCar = (car) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${car.name ? car.name : "..."}`
    );
    setModalContent(
      <EditCarForm
        car={car}
        setIsVisibleModal={setIsVisibleModal}
        setReloadCars={setReloadCars}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={cars}
      renderItem={(car) =>
      (
        <CarItem 
        car={car}
        editCar={editCar}
          setReloadCars={setReloadCars} />
      )}
    />
  );
}

function CarItem(props) {
  const { car, editCar, setReloadCars } = props

  const showDeleteConfirm = () => {

    confirm({
      title: "Eliminando carro",
      content: `¿Estas seguro que quieres eliminar a ${car.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCar(car._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadCars(true)
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={
        [<Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
        <Button type="primary" onClick={() => editCar(car)}>
          <EditOutlined />
        </Button>
        ]}
    >
      <List.Item>{car.name}</List.Item>
    </List.Item>
  )
}

