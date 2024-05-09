/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyModal(props) {
  console.log("props");
  console.log(props);
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        {props.data ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                  <img className="h-6 w-6 text-black" src="src\assets\vuelo3.png" alt="Flight Ticket" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black">Ticket Vuelo</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Fecha: {props.data.fecha}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Tu Origen</p>
                <p className="text-black font-medium">{props.data.origen}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Tu Destino</p>
                <p className="text-black font-medium">{props.data.destino}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-black">Ya cuentas con un destino.</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
