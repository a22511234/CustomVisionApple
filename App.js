import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, ImageBackground, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
export default function App(){
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png',);
  const [imageData, setImageData] = useState('',);
  const [imageURL,setImageURL]=useState('',);

  let asyncFunc= async() => {
    const requestOption = {
      method: 'POST',
      headers: {
        'Prediction-Key': '13ddf0718d0d4b3b8ccddabd475c3d60',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: "https://i.imgur.com/V8R8ffy.jpg"
      })
    }
    let resp = await fetch("https://dailyjuicy-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/02a510bb-100e-421d-8df8-2e584f21554b/classify/iterations/Iteration2/url", requestOption)
    let respJson = await resp.json();
    const result = respJson.predictions[0].tagName;
    console.warn("Resp3", result);
    alert(result)
  }
  let asyncFunc2= async() => {
    const requestOption = {
      method: 'POST',
      headers: {
        'Prediction-Key': '13ddf0718d0d4b3b8ccddabd475c3d60',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: imageURL
      })
    }
    let resp = await fetch("https://dailyjuicy-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/02a510bb-100e-421d-8df8-2e584f21554b/classify/iterations/Iteration2/url", requestOption)
    let respJson = await resp.json();
    const result = respJson.predictions[0].tagName;
    console.warn("Resp3", result);
    alert(result)
  }
  let upload=()=> {
    var formdata = new FormData();
    var images = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
  };
    formdata.append("image", imageData);

    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Client-ID 50140947a620cb3'
      },
      body: formdata,
      redirect: 'follow'
    };
    fetch("https://api.imgur.com/3/image", requestOptions)
    .then(res=>res.json())
    .then(datas=>{
      console.warn("Resp4", datas);
      console.warn("Resp4", datas.data.link);
      setImageURL(datas.data.link)
    })
    
  }
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    }).then(images => {
      setImage(images.path);
      setImageData(images.data);
    });
  };

  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={asyncFunc}
          style={styles.button}>
          <Text style={{ color: "white" }}>Pull Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={ upload}>
        <Text style={{ color: "white" }}>upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={choosePhotoFromLibrary}>
          <Text style={{ color: "white" }}>從圖庫選擇</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={asyncFunc2}>
          <Text style={{ color: "white" }}>AZURE</Text>
        </TouchableOpacity>
        <View style={{ height: 200, width: 200, backgroundColor: 'blue' }}>
        <Image
          style={{ height: 100, width: 100, }}
          source={{ uri: image }}
        >
        </Image>
      </View>

      </View >
    )

  }

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: 42,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "green",
  }
})