import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { primaryColor, secondaryColor } from "../components/CommonStyle";
import { useForm, Controller } from "react-hook-form";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/authActions";
// import DateTimePicker from "@react-native-community/datetimepicker";

import * as ImagePicker from "expo-image-picker";

const MAX_STEPS = 4;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}`~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);

  const [formStep, setFormStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gendervalue, setGenderValue] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [biography, setBiography] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({});
  const [secureEntryText, setSecureEntryText] = useState(true);
  const [confirm_secureEntryText, setConfirm_SecureEntryText] = useState(true);
  const [passwordFormErrors, setPasswordFormErrors] = useState();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  /*********************************************************UPLOAD FUNCTION START************************************************ */
  const openImageLibraryKeyMessage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        const ext = response.uri.split(".").pop();
        const arrEl = {
          uri: response.uri,
          name: `file.${ext}`,
          type: response.type,
        };
        setAvatar(arrEl);
      }
    }
  };
  /*********************************************************UPLOAD FUNCTION ENDS************************************************ */

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const pwd = watch("password");

  const dispatch = useDispatch();

  const commonCategoryStyle = "h-3 w-3 rounded-full bg-white mr-3";
  const selectedCategoryStyle = "h-3 w-3 rounded-full bg-[#2917FC] mr-3";

  const handleSecureEntryText = () => {
    setSecureEntryText(!secureEntryText);
  };

  const handleConfirmSecureEntryText = () => {
    setConfirm_SecureEntryText(!confirm_secureEntryText);
  };

  const onSignUpPress = (data) => {
    const { displayName, userName, email, phone, password, birthday } = data;
    var renderData = {
      displayName,
      userName,
      gender: gendervalue,
      email,
      phone,
      password,
      birthday,
    };
    dispatch(signUp(renderData));

    // console.log("renderData", renderData);
  };

  // console.log("auth", auth);

  const onSubmitPost = () => {
    var formData = new FormData();

    formData.append("userName", userName);
    formData.append("name", displayName);
    formData.append("gender", gendervalue);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("phonenumber", phonenumber);
    formData.append("biography", biography);
    formData.append("password", password);
    avatar &&
      formData.append("file", {
        name: `avatar${Date.now()}-${avatar.name}`,
        uri: avatar.uri,
        type: `${avatar.type}/*`,
      });
    console.log("sign in form data", formData);
    dispatch(signUp(formData));
    navigation.navigate("Verify");
  };

  const goToNextStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const goToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
  };

  const renderButton = () => {
    if (formStep === 4) {
      return (
        <View className="flex flex-row justify-evenly items-center w-full h-14">
          <TouchableOpacity
            onPress={goToPreviousStep}
            activeOpacity={0.5}
            className="flex justify-center items-center w-2/5 h-full border-[#2917FC] border-2 rounded-lg"
          >
            <MyText
              content="Back"
              myStyle="text-[#2917FC] font-bold text-justify text-base"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmitPost}
            activeOpacity={0.5}
            className="flex justify-center items-center w-2/5 h-full bg-[#2917FC] rounded-lg"
          >
            <MyText
              content="Submit"
              myStyle="text-white font-bold text-justify text-base"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (formStep === 0) {
      return (
        <TouchableOpacity
          onPress={goToNextStep}
          activeOpacity={0.5}
          className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-lg"
        >
          <MyText
            content="Continue"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <View className="flex flex-row justify-evenly items-center w-full h-14">
          <TouchableOpacity
            onPress={goToPreviousStep}
            activeOpacity={0.5}
            className="flex justify-center items-center w-2/5 h-full border-[#2917FC] border-2 rounded-lg"
          >
            <MyText
              content="Back"
              myStyle="text-[#2917FC] font-bold text-justify text-base"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToNextStep}
            activeOpacity={0.5}
            className="flex justify-center items-center w-2/5 h-full bg-[#2917FC] rounded-lg"
          >
            <MyText
              content="Next"
              myStyle="text-white font-bold text-justify text-base"
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white p-5">
      <StatusBar style="auto" />
      <View className="flex w-full">
        <MyText
          content="Sign Up"
          myStyle="text-[#2917FC] font-bold text-justify text-3xl mb-10"
        />
      </View>

      <View className="flex flex-col justify-center items-center w-full">
        {formStep === 0 && (
          <View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "E-mail is required",
                pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full">
                    <View>
                      <Entypo name="email" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={onBlur}
                        placeholder="Email ID"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="displayName"
              rules={{ required: "Full name is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome name="user" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={displayName}
                        onChangeText={(text) => setDisplayName(text)}
                        onBlur={onBlur}
                        placeholder="Display Name"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome name="phone" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={phonenumber}
                        onChangeText={(text) => setPhonenumber(text)}
                        onBlur={onBlur}
                        placeholder="Phone Number"
                        className="w-full"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
          </View>
        )}
        {formStep === 1 && (
          <View>
            <Controller
              control={control}
              name="userName"
              rules={{ required: "Full name is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full">
                    <View>
                      <FontAwesome5
                        name="user-edit"
                        size={16}
                        color="#333333"
                      />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                        onBlur={onBlur}
                        placeholder="Username"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="birthday"
              // rules={{required: "Full name is required"}}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome
                        name="birthday-cake"
                        size={16}
                        color="#333333"
                      />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={dob}
                        onChangeText={(text) => setDob(text)}
                        onBlur={onBlur}
                        placeholder="Birthday"
                        className="w-full"
                        onFocus={() => alert("oya")}
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
          </View>
        )}
        {formStep === 2 && (
          <View>
            <Controller
              control={control}
              name="gender"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <MaterialCommunityIcons
                        name="human"
                        size={20}
                        color="#333333"
                      />
                    </View>
                    <View className="flex-1 flex-row justify-center items-center border-b ml-3 border-b-[#C1C1C1]">
                      <View className="flex w-2/5">
                        <MyTextInput
                          value={gendervalue}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Gender"
                          className="w-full"
                          readOnly="true"
                        />
                      </View>
                      <View className="flex flex-row justify-between items-center w-3/5 h-7 mb-2 rounded-lg">
                        <TouchableOpacity
                          onPress={() => setGenderValue("male")}
                          className="flex flex-row justify-center items-center h-full w-1/2 mr-1 bg-[#E8EDF1] rounded-lg"
                        >
                          <View
                            className={
                              gendervalue === "male"
                                ? selectedCategoryStyle
                                : commonCategoryStyle
                            }
                          ></View>
                          <MyText
                            content="Male"
                            myStyle="text-center font-semibold text-sm"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setGenderValue("female")}
                          className="flex flex-row justify-center items-center h-full w-1/2 bg-[#E8EDF1] rounded-lg"
                        >
                          <View
                            className={
                              gendervalue === "female"
                                ? selectedCategoryStyle
                                : commonCategoryStyle
                            }
                          ></View>
                          <MyText
                            content="Female"
                            myStyle="text-center font-semibold text-sm"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              )}
            />
            <Controller
              control={control}
              name="biography"
              // rules={{required: "Phone number is required"}}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <MaterialCommunityIcons
                        name="bio"
                        size={24}
                        color="black"
                      />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={biography}
                        onChangeText={(text) => setBiography(text)}
                        onBlur={onBlur}
                        placeholder="Biography"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
          </View>
        )}
        {formStep === 3 && (
          <View>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <Entypo name="lock" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 flex-row border-b ml-3 border-b-[#C1C1C1] w-full pr-4">
                      <View className="w-full">
                        <MyTextInput
                          value={password}
                          onChangeText={(text) => setPassword(text)}
                          onBlur={onBlur}
                          placeholder="Password"
                          className="w-full"
                          // readOnly="true"
                          secureTextEntry={secureEntryText}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={handleSecureEntryText}
                        className="flex justify-center items-center w-8 h-8"
                      >
                        {secureEntryText ? (
                          <Ionicons name="eye" size={20} color="#333333" />
                        ) : (
                          <Ionicons name="eye-off" size={20} color="#333333" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              rules={{
                validate: (value) => value === pwd || "Password do not match",
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <MaterialCommunityIcons
                        name="lock-check"
                        size={16}
                        color="#333333"
                      />
                    </View>
                    <View className="flex-1 flex-row border-b ml-3 border-b-[#C1C1C1] w-full pr-4">
                      <View className="w-full">
                        <MyTextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Confirm Password"
                          className="w-full"
                          // readOnly="true"
                          secureTextEntry={confirm_secureEntryText}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={handleConfirmSecureEntryText}
                        className="flex justify-center items-center w-8 h-8"
                      >
                        {confirm_secureEntryText ? (
                          <Ionicons name="eye" size={20} color="#333333" />
                        ) : (
                          <Ionicons name="eye-off" size={20} color="#333333" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {error && setPasswordFormErrors(error)}
                  {!error && setPasswordFormErrors()}
                </>
              )}
            />
          </View>
        )}
        {formStep === 4 && (
          <View className="flex justify-center items-center">
            <TouchableOpacity
              onPress={openImageLibraryKeyMessage}
              className="flex justify-center items-center w-40 h-40 rounded-full border border-dotted border-[#2917FC] bg-[#E8EDF1]"
            >
              <MaterialCommunityIcons
                name="image-plus"
                size={50}
                color="#2917FC"
              />
            </TouchableOpacity>
            {avatar?.uri && (
              <View className="flex justify-center items-center w-40 h-40 absolute rounded-full border border-dotted border-[#2917FC] bg-[#E8EDF1]">
                <Image
                  source={{ uri: avatar.uri }}
                  className="w-full h-full rounded-full"
                />
              </View>
            )}
            {/* <View className="absolute flex justify-center items-center w-40 h-40 rounded-full border border-dotted border-[#2917FC] bg-[#E8EDF1]"></View> */}
          </View>
        )}

        {passwordFormErrors && (
          <View className="flex flex-row justify-center items-center my-2">
            <MaterialIcons name="error-outline" size={16} color="red" />
            <MyText
              content="Please, make sure your passwords match"
              myStyle="text-[#180181] font-bold text-justify text-xs ml-2"
            />
          </View>
        )}
        <View className="flex flex-row flex-wrap justify-start items-center w-full my-5">
          <MyText
            content="By Signing up, You've agree to our "
            myStyle="text-[#000000] font-bold text-justify text-xs mb-5"
          />
          <TouchableOpacity activeOpacity={0.5}>
            <MyText
              content="Terms & Conditions"
              myStyle="text-[#2917FC] font-bold text-justify text-xs"
            />
          </TouchableOpacity>
          <MyText
            content=" and "
            myStyle="text-[#000000] font-bold text-justify text-xs"
          />
          <TouchableOpacity activeOpacity={0.5}>
            <MyText
              content="Privacy Policy"
              myStyle="text-[#2917FC] font-bold text-justify text-xs"
            />
          </TouchableOpacity>
        </View>
        {renderButton()}
        <View className="flex flex-row justify-center items-center w-full mt-5">
          <MyText
            content="Already have an account? "
            myStyle="text-[#000000] font-bold text-justify text-sm"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            activeOpacity={0.5}
          >
            <MyText
              content="login"
              myStyle="text-[#2917FC] font-bold text-justify text-sm"
            />
          </TouchableOpacity>
        </View>
        {/* {show && DateTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
