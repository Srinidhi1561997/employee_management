import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { editSpecificEmployee } from "../../reducers/actions";
import SnackbarMessage from "../../components/snackbar";
import DelayingAppearance from "../../components/circularProgressBar";
import schema from "../../components/inputSchema";
import { IFormInput } from "../../utils/interface";
const drawerWidth = 400;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight(props: any) {
  const { openDrawer, setOpenDrawer, editUser } = props;
  const theme = useTheme();

  console.log("edituser value is", setOpenDrawer);
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  //   console.log('edituser value is',editUser)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isEdit = useAppSelector((state) => state.editUserData.isEdit);
  const isLoading = useAppSelector((state) => state.editUserData.isLoading);
  // const [editUserData, setEditUserData] = React.useState<employeeData>()
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const history = useNavigate();
  // const params:any = location.state as { editUser: employeeData }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), defaultValues: {} });

  const pageNumber: any = location.state as { pageNumber: Number };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.designation === "") {
      data.designation = editUser?.designation;
    }
    if (data.first_name === "") {
      data.first_name = editUser?.first_name;
    }
    if (data.last_name === "") {
      data.last_name = editUser?.last_name;
    }
    if (data.gender === "") {
      data.gender = editUser?.gender;
    }
    if (data.office_location === "") {
      data.office_location = editUser?.office_location;
    }
    if (data.id === "") {
      data.id = editUser?.id;
    }
    if (data.employee_id === "") {
      data.employee_id = editUser?.employee_id;
    }
    if (data.email === "") {
      data.email = editUser?.email;
    }
    dispatch(editSpecificEmployee(editUser?.id, data));
  };

  React.useEffect(() => {
    // setEditUserData(editUser)
    reset(editUser);
  }, [editUser.id]);

  React.useEffect(() => {
    if (isEdit) {
      setOpenSnackbar(true);
      props.refetchEmpolyees("get_employees");
      setTimeout(() => {
        reset();
        handleDrawerClose();
      }, 1000);
    }
  }, [isEdit]);

  const resetFields = () => {
    reset();
  };

  // console.log('edituser value', props.editUser,ditUserDatea)
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        // variant="persistent"
        anchor="right"
        open={openDrawer}
      >
        <DrawerHeader>
          <AppBar style={{ width: drawerWidth, marginBottom: "40%" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                // sx={{ mr: 2 }}
              >
                <HomeIcon
                  onClick={() => {
                    [reset(), handleDrawerClose()];
                  }}
                />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  // flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Update new employee
              </Typography>
            </Toolbar>
          </AppBar>
        </DrawerHeader>
        <div>
          {/* <AppHeader headerName="Edit employee"/> */}
          <SnackbarMessage
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
            snackbarMessage={`${editUser?.first_name} ${editUser?.last_name} edited successfully`}
          ></SnackbarMessage>
          <DelayingAppearance loading={isLoading} />
          <Styles.Container className="inputBox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Styles.Container className="OuterDiv">
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    First Name
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      defaultValue={editUser?.first_name}
                      {...register("first_name")}
                      placeholder="first name"
                    />
                    <Styles.ContainerSpan className="ErrorSpan">
                      {errors.first_name && errors.first_name.message}
                    </Styles.ContainerSpan>
                  </Styles.Container>
                </Styles.Container>
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    Last Name
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      defaultValue={editUser?.last_name}
                      {...register("last_name")}
                      placeholder="last name"
                    />
                    <Styles.ContainerSpan className="ErrorSpan">
                      {errors.last_name && errors.last_name.message}
                    </Styles.ContainerSpan>
                  </Styles.Container>
                </Styles.Container>
              </Styles.Container>
              <Styles.Container className="OuterDiv">
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    Email
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      type="string"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      defaultValue={editUser?.email}
                      {...register("email")}
                      placeholder="email"
                    />
                    <Styles.ContainerSpan className="ErrorSpan">
                      {errors.email && errors.email.message}
                    </Styles.ContainerSpan>
                  </Styles.Container>
                </Styles.Container>
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    Gender
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>

                  <Styles.Container className="ErrorDiv">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <Select
                          className="dropDownSelect"
                          defaultValue={editUser?.gender?.toLowerCase()}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          // {...register('gender')}
                          placeholder="gender"
                          {...field}
                          inputRef={ref}
                        >
                          <MenuItem value="male">male</MenuItem>
                          <MenuItem value="female">female</MenuItem>
                          <MenuItem value="agender">agender</MenuItem>
                          <MenuItem value="bigender">bigender</MenuItem>
                          <MenuItem value="genderqueer">genderqueer</MenuItem>
                          <MenuItem value="others">others</MenuItem>
                        </Select>
                      )}
                    />
                    {""}
                  </Styles.Container>
                </Styles.Container>
              </Styles.Container>

              <Styles.Container className="OuterDiv">
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    Designation
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      type="string"
                      defaultValue={editUser?.designation}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register("designation")}
                      placeholder="designation"
                    />
                    <Styles.ContainerSpan className="ErrorSpan">
                      {errors.designation && errors.designation.message}
                    </Styles.ContainerSpan>
                  </Styles.Container>
                </Styles.Container>
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>
                    Office Location
                    <Styles.ContainerSpan className="SpanAsterisk">
                      *
                    </Styles.ContainerSpan>
                  </Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      type="string"
                      defaultValue={editUser?.office_location}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register("office_location")}
                      placeholder="office location"
                    />
                    <Styles.ContainerSpan className="ErrorSpan">
                      {errors.office_location && errors.office_location.message}
                    </Styles.ContainerSpan>
                  </Styles.Container>
                </Styles.Container>
              </Styles.Container>
              <Styles.Container className="OuterDiv">
                <Styles.Container className="InnerDiv">
                  <Styles.InputTitle>Employee Id</Styles.InputTitle>
                  <Styles.Container className="ErrorDiv">
                    <Styles.Input
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      value={editUser?.employee_id}
                      disabled
                      readOnly
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register("employee_id", {
                        // value: editUserData?.employee_id,
                      })}
                      placeholder="employee id"
                    />
                    {""}
                  </Styles.Container>
                </Styles.Container>
                <Styles.Container className="InnerDiv"></Styles.Container>
              </Styles.Container>
              <Styles.Container className="OuterDiv">
                <Styles.Container className="InnerDiv">
                  <Styles.Input
                    type="submit"
                    style={{ backgroundColor: "#1976d2", color: "#FFF" }}
                  />
                </Styles.Container>
                <Styles.Container className="InnerDiv">
                  <Styles.Button type="reset" onClick={resetFields}>
                    Reset
                  </Styles.Button>
                </Styles.Container>
              </Styles.Container>
            </form>
          </Styles.Container>
        </div>

        <Divider />
      </Drawer>
    </Box>
  );
}
