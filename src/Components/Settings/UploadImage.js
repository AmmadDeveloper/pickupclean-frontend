import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload,notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { AdminClient, Serverurl } from '../../Misc/Api';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const UploadImage = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  useEffect(()=>{
    function fetchImages(){
      AdminClient.get('homeimages').then((res)=>{
        if(res.status===200){
          setFileList(res.data.images);
        }else{
          setFileList([]);
        }
      })
    }
    fetchImages();
  },[])
  const openNotificationWithIcon = data => {
      notification['error']({
        message: data.statuscode,
        description:data.message
      });
  };

  const openNotificationWithIconSuccess = data => {
      notification[data.message]({
        message: data.statusmessge,
        description:data.message
      });
  };
  const handleCancel = () => setPreviewVisible(false);
  const handleRemove=(x)=>{
    AdminClient.post(`homeimages?id=${x.uid}`).then((res)=>{
      if(res.status===200){
        openNotificationWithIconSuccess(res.data);
      }else{
        var data={
          "statuscode":400,
          "message":'Request not completed please try again later'
        }
        openNotificationWithIcon(data);
      }
    })
    console.log(x.uid);
  }
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action={`${Serverurl}/panel/api/bgupload`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} title={previewTitle} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadImage;





// [
  // {
  //   uid: '-1',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
//   {
//     uid: '-2',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-3',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-4',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-xxx',
//     percent: 50,
//     name: 'image.png',
//     status: 'uploading',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-5',
//     name: 'image.png',
//     status: 'error',
//   },
// ]