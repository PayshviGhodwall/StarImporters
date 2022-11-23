import appHttpService from "../appHttpService";
import { toast } from "react-toastify";

export async function privacyPolicy(formData) {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/welcome/privacyPolicy`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function aboutUs(formData) {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/welcome/aboutUs`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function tAndC(formData) {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/welcome/tAndC`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changePassword(formData) {
  try {
    const { data } = await appHttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/user/changePassword`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getUserProfile(formData) {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/getUserProfile`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function editProfile(formData) {
  try {
    const { data } = await appHttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/user/editProfile`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function homeBanner() {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/homeBanner/getSlides`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getCategory() {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/category/getCategory`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getAllProducts() {
  try {
    const { data } = await appHttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/user/products/getAllProducts`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getBrands() {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/brands/getBrands`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getSubCategories() {
  try {
    const { data } = await appHttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/user/subCategory/getSubCategories`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
