import React, { useState, useEffect } from 'react';
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { GridContainer } from "carbon-react/lib/components/grid";
import LayoutItemData from './LayoutItemData';
import Link from "carbon-react/lib/components/link";
import axios from 'axios';
import Dialog from "carbon-react/lib/components/dialog";
import Form from "carbon-react/lib/components/form";
import Button from "carbon-react/lib/components/button";
import Typography, {
  List,
  ListItem,
} from "carbon-react/lib/components/typography";
import Loader from "carbon-react/lib/components/loader";

const DisplayReport = ({ mainLayoutId }) => {

  const [layoutData, setLayoutData ] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [overlayData, setOverlayData] = useState({  header : "", btnText : "", contentTop: "", contentBottom : ""});
  const [subApiResponse, setSubApiResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState("");
  const [componentLayout, setComponentLayout] = useState([]);
  const [subLayoutData, setSubLayoutData ] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  let pageurl = new URL(window.location.href);
  let idValue = mainLayoutId ? mainLayoutId : pageurl.searchParams.get("mainLayoutId");
  const [layoutId, setLayoutId] = useState(idValue);
  const [isDependentVal, setIsDependentVal] = useState("");
  const [parentKey, setParentKey] = useState("");
  const [ overlayApiData, setOverlayApiData] = useState("");
  const [ isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [ apiSuccess , setApiSuccess] = useState("");
  const [saveBtnComponent, setSaveBtnComponent] = useState("");
  const getApiData = () => {
    try{
      axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getResponse?category=main_data`)
      .then(res => {
        setApiResponse(res.data);
      })
    } catch (err) {
      console.info("error",err);
    }
  }
  const getLayoutData = () => {
    try{
      axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getLayout`)
      .then(res => {
        setLayoutData(res.data);
      });
    } catch (err) {
      console.info("error",err);
    }
   
  }
 
  let preCol = 1;
  const getLayoutcol = (colVal = 13) => {
    colVal =colVal +1;
    let retVal = `1 / ${colVal}`;
    if(colVal < 13) {
      if(preCol != 1) {
        colVal  = 13;
      }
      retVal = `${preCol} / ${colVal}`;
      preCol = colVal == 13 ? 1 : colVal;
      return retVal;
    }
    preCol = 1;
    return retVal;
  }

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = async (propsData, index, apiDataType) => {
    if(!propsData) return null;
    let { layoutId } = propsData; 
    if(!layoutId) return null;

    setIsOpen(true);
    //setPageIndex(0);
    const getDataUrl = apiResponse[0][apiDataType][index]; 
    console.info(getDataUrl,"getDataUrl.dataUrl",getDataUrl.data_url)
    setLayoutId(layoutId);
      await axios.get(getDataUrl.data_url)
      .then(res => {
          setSubApiResponse(res.data);
      });
  };

  const getCompLayout = () => {
    if(layoutData.length > 0){
      const rowLayoutData = layoutData.filter((row) => row.id == layoutId);
      if(rowLayoutData.length > 0){
        isOpen == false && setComponentLayout(rowLayoutData[0].componentLayout);
        isOpen == true && setSubLayoutData(rowLayoutData[0].componentLayout);
      }
    }
  }
  
  const showOverlayData = (keyData) => {
    console.info( componentLayout[keyData], "isDependentVal", componentLayout[isDependentVal])
    let {props, isDependent } = keyData ? componentLayout[keyData] : componentLayout[isDependentVal];
    setIsDependentVal(isDependent);
    setParentKey(keyData);
    setOverlayData(props.data);
    console.info("props.data",props.data);
    if(props.data.isLoader) {
      setIsLoadingOverlay(true);
      setTimeout(() => {
        setIsLoadingOverlay(false);
        setApiSuccess("HMRC Connected Successfully !");
      }, 3000);
    }
    setIsDialogOpen(true);
    const rData = getApiDataRow(keyData);
    setOverlayApiData(rData);
    props.isDependentBtn && setSaveBtnComponent(props.isDependentBtn);
  }

  const getApiDataRow = (keyData) => {
    let rData = [];
    if(keyData && apiResponse.length > 0) {
      const apiRowData = apiResponse[0];
      rData = apiRowData[keyData];
    }
    return rData ? rData : [];
  }

  const submitData = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    showOverlayData();
  }
  useEffect(() => {
    if(apiResponse.length > 0 && layoutData.length === 0){
      getLayoutData();
    } 
    if(apiResponse.length == 0) {
      getApiData();
    }
    getCompLayout();

  },[apiResponse.length, layoutData.length, subApiResponse.length]);

  const triggerApiFunc = (e, propsData) => {
    console.info("props",propsData);
    e.preventDefault();
    setIsDialogOpen(false);
    showOverlayData();
  }
  const renderComponentSave = () => {
    let {props} = saveBtnComponent ? componentLayout[saveBtnComponent] : {}; 
    let { isDependent, data } = props || {};
    if(isDependent) {
      return ( <Button {...props} onClick={() => showOverlayData(isDependent)} className="bottom_btn">
      {data}
  </Button>);
    } 
    return ( <Button {...props} onClick={(e) => triggerApiFunc(e, props)} className="bottom_btn">
        {data}
    </Button>);
  }
  return (
    <CarbonProvider>
        
          <Dialog size="medium" open={isDialogOpen} title={overlayData.header} onCancel={() => setIsDialogOpen(false)}>
          {apiSuccess ? <Typography>{apiSuccess} </Typography> : <Form stickyFooter={true} leftSideButtons={<Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>} saveButton={renderComponentSave()}>
                  <p> {overlayData.contentTop} </p>
                  {overlayApiData.expireDate && <Typography> {overlayApiData.expireDate} </Typography>}
                  {isLoadingOverlay && <Loader isActive isInsideButton={false} size="small" style={{
        textAlign: "left"
      }} />}
                  <p> {overlayData.contentBottom} </p>
            </Form>}
          </Dialog>
        
        {/* <Heading title={name} divider={false} ml="8px"/> */}
        <GridContainer>
            {isOpen === false &&
              Object.keys(componentLayout).length > 0 && Object.keys(componentLayout).map((componentLayoutKey, key) => (
                <>
                  <LayoutItemData showOverlayData={showOverlayData} handleOpen={handleOpen} isLayout="main" key={key} getLayoutcol={getLayoutcol} apiDataType={componentLayoutKey} componentLayout={componentLayout[componentLayoutKey]} apiResponse={apiResponse} />
                </>
              ))
            }
            {isOpen === true && subApiResponse.length > 0 && <>
                <Link style={{ width : "100px"}} onClick={() => handleCancel()} icon="chevron_left_thick"> Back</Link>
                {Object.keys(subLayoutData).length > 0 && Object.keys(subLayoutData).map((componentLayoutKey, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} isLayout="subMain" key={key} getLayoutcol={getLayoutcol} apiDataType={componentLayoutKey}  componentLayout={subLayoutData[componentLayoutKey]} apiResponse={subApiResponse} />
                </>
              ))}
          </>}
          </GridContainer>
    </CarbonProvider>
  )
};

export default DisplayReport;
