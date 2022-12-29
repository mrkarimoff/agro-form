import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Table from "./Table";
import reload from "./reload.png";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

function Form() {
  const [subData, setSubData] = useState([]);
  const [qtys, setQtys] = useState([]);
  const [rates, setRates] = useState([]);
  const [kgOrUnits, setKgOrUnits] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [lang, setLang] = useState("eng");
  const [langData, setLangData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios({
      url: "https://my-json-server.typicode.com/mrkarimoff/fake-backend/" + lang,
      method: "GET",
    }).then((res) => setLangData(res.data));
  }, [lang]);

  const onSubmit = (data) => {
    setSubData([
      ...subData,
      {
        ...data,
        traderOrFarmerName: {
          name: data.traderOrFarmerName.split("_")[0],
          id: data.traderOrFarmerName.split("_")[1],
        },
        customerName: {
          name: data.customerName.split("_")[0],
          id: data.customerName.split("_")[1],
        },
        vegetableName: {
          name: data.vegetableName.split("_")[0],
          id: data.vegetableName.split("_")[1],
        },
        firstUnit: {
          name: data.firstUnit.split("_")[0],
          id: data.firstUnit.split("_")[1],
        },
      },
    ]);
    setQtys([...qtys, Number(data.qtyNumber)]);
    setRates([...rates, Number(data.rateNumber)]);
    setKgOrUnits([...kgOrUnits, Number(data.kgOrUnit)]);
    setAmounts([
      ...amounts,
      Number(data.qtyNumber) * Number(data.rateNumber) * Number(data.kgOrUnit),
    ]);

    reset({ qtyNumber: "", customerName: "", kgOrUnit: "", multiply: false });
  };

  function deleteRow(rowIndex) {
    subData.splice(rowIndex, 1);
    qtys.splice(rowIndex, 1);
    rates.splice(rowIndex, 1);
    kgOrUnits.splice(rowIndex, 1);
    amounts.splice(rowIndex, 1);
    setSubData([...subData]);
    setQtys([...qtys]);
    setRates([...rates]);
    setKgOrUnits([...kgOrUnits]);
    setAmounts([...amounts]);
  }

  function onConfirm() {
    if (isReload) {
      reset({
        traderOrFarmerName: "",
        vegetableName: "",
        customerName: "",
        firstUnit: "",
      });
      axios({
        url: "https://my-json-server.typicode.com/mrkarimoff/fake-backend/" + lang,
        method: "GET",
      }).then((res) => setLangData(res.data));
    } else {
      reset();
    }
    setIsReload(false);
  }

  function submitForm() {
    setShowToast(true);
    if (subData?.length > 0) {
      axios({
        url: "https://my-json-server.typicode.com/mrkarimoff/fake-backend/tableData",
        method: "POST",
        data: subData,
      });
      setToastText(langData[0]?.toastSuccessMsg);
    } else {
      setToastText(langData[0]?.toastErrorMsg);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <div className="App">
      {/* Toast */}
      <div className="toast-container position-fixed top-0 start-0 p-3">
        <div className={"toast " + (showToast && "show")}>
          <div className="toast-header">
            <strong className={`me-auto ${subData?.length > 0 ? "text-success" : "text-danger"}`}>
              {toastText}
            </strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="alertModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {alertMessage}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                onClick={onConfirm}
                data-bs-toggle="modal"
                data-bs-target="#alertModal"
                type="button"
                className="btn btn-primary"
              >
                {langData[0]?.modal?.btn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="d-flex  align-items-center justify-content-between">
        <h1 className="text-center w-75">{langData[0]?.title}</h1>
        <div className="lang mx-3">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="form-select">
            <option value={"eng"}>English</option>
            <option value={"rus"}>Russian</option>
          </select>
        </div>
      </div>

      {/* Form Content */}
      <div className="container pt-2">
        <div className="d-flex justify-content-end">
          <button
            data-bs-toggle="modal"
            data-bs-target="#alertModal"
            onClick={() => {
              setIsReload(true);
              setAlertMessage(langData[0]?.modal?.reloadMsg);
            }}
            className="btn btn-light"
          >
            <img width={30} src={reload} alt="reload" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3 mx-2">
          <div className="col-lg-2 col-md-3">
            <label htmlFor="datePicker" className="form-label">
              {langData[0]?.date?.label}
            </label>
            <input
              {...register("date")}
              type="date"
              className="form-control"
              id="datePicker"
              required
            />
          </div>
          <div className="col-lg-3 col-md-5">
            <label htmlFor="TraderName" className="form-label">
              {langData[0]?.traderName?.label}
            </label>
            <select
              defaultValue={""}
              {...register("traderOrFarmerName")}
              className="form-select"
              id="TraderName"
              required
            >
              <option disabled value="">
                {langData[0]?.traderName?.defOption}
              </option>
              {langData[0]?.traderName?.options.map((opt, index) => (
                <option value={`${opt.value}_${opt.id}`} key={index}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-4">
            <label htmlFor="vegetableName" className="form-label">
              {langData[0]?.vegetableName?.label}
            </label>
            <select
              defaultValue={""}
              {...register("vegetableName")}
              className="form-select"
              id="vegetableName"
              required
            >
              <option disabled value="">
                {langData[0]?.vegetableName?.defOption}
              </option>
              {langData[0]?.vegetableName?.options.map((opt, index) => (
                <option value={`${opt.value}_${opt.id}`} key={index}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-3 col-md-2">
            <label htmlFor="rateNumber" className="form-label">
              {langData[0]?.rate?.label}
            </label>
            <input
              step=".01"
              {...register("rateNumber", {
                min: { value: 0.01, message: langData[0]?.errMsg },
              })}
              type="number"
              className="form-control"
              id="rateNumber"
              required
            />
            {errors.rateNumber?.message ? (
              <div style={{ color: "red", width: "200px" }}>{errors.rateNumber?.message}</div>
            ) : (
              <div className="hidden">Lorem ipsum dolor</div>
            )}
          </div>
          <div className="col-lg-2 col-md-3">
            <label htmlFor="firstUnit" className="form-label">
              {langData[0]?.firstUnit?.label}
            </label>
            <select
              defaultValue={""}
              {...register("firstUnit")}
              className="form-select"
              id="firstUnit"
              required
            >
              <option disabled value="">
                {langData[0]?.firstUnit?.defOption}
              </option>
              {langData[0]?.firstUnit?.options.map((opt, index) => (
                <option value={`${opt.value}_${opt.id}`} key={index}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3 col-md-4 nameCustomer">
              <label htmlFor="customerName" className="form-label">
                {langData[0]?.customerName?.label}
              </label>
              <select
                required
                defaultValue={""}
                {...register("customerName")}
                className="form-select"
                id="customerName"
              >
                <option disabled value="">
                  {langData[0]?.customerName?.defOption}
                </option>
                {langData[0]?.customerName?.options.map((opt, index) => (
                  <option value={`${opt.value}_${opt.id}`} key={index}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-3 col-md-2">
              <label htmlFor="kgUnitNumber" className="form-label">
                {langData[0]?.kgOrUnit?.label}
              </label>
              <input
                step=".01"
                {...register("kgOrUnit", {
                  min: { value: 0.01, message: langData[0]?.errMsg },
                })}
                type="number"
                className="form-control"
                id="kgUnitNumber"
                required
              />
              {errors.kgOrUnit?.message ? (
                <div style={{ color: "red", width: "200px" }}>{errors.kgOrUnit?.message}</div>
              ) : (
                <div className="hidden">Lorem ipsum dolor</div>
              )}
            </div>
            <div className="col-sm-2 col-md-1">
              <div className="f-check">
                <label className="form-check-label f-label" htmlFor="multiplicationCheck">
                  x
                </label>
                <input
                  {...register("multiply")}
                  className="form-check-input"
                  type="checkbox"
                  id="multiplicationCheck"
                  required
                />
              </div>
            </div>
            <div className="col-sm-3 col-md-2">
              <label htmlFor="qtyNumber" className="form-label">
                {langData[0]?.qtyNumber?.label}
              </label>
              <input
                step=".01"
                {...register("qtyNumber", {
                  min: { value: 0.01, message: langData[0]?.errMsg },
                })}
                type="number"
                className="form-control"
                id="qtyNumber"
                required
              />
              {errors.qtyNumber?.message ? (
                <div style={{ color: "red", width: "200px" }}>{errors.qtyNumber?.message}</div>
              ) : (
                <div className="hidden">Lorem ipsum dolor</div>
              )}
            </div>
            <div className="col-md-2 d-flex align-items-center gap-3">
              <button type="submit" className="btn btn-secondary add">
                {langData[0]?.addBtn}
              </button>
            </div>
          </div>
        </form>

        {/* Table Content */}
        <Table
          tableLangDate={langData[0]?.table}
          deleteRow={deleteRow}
          totals={{ qtys, kgOrUnits, amounts, rates }}
          data={subData}
        />
        <hr />

        {/* Main Buttons */}
        <div className="m-0 mb-3 d-flex justify-content-end">
          <div className="btn-cont  d-flex gap-4 m-btn">
            <button onClick={submitForm} type="button" className="btn btn-success w-100">
              {langData[0]?.submitBtn}
            </button>
            <button
              onClick={() => setAlertMessage(langData[0]?.modal?.cancelMsg)}
              data-bs-toggle="modal"
              data-bs-target="#alertModal"
              type="button"
              className="btn btn-warning w-100"
            >
              {langData[0]?.cancelBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
