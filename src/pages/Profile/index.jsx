import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Skeleton,
  Typography,
  Divider,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// Components Imports
import OptionMenu from "../../components/ui/option-menu";
import CustomDialog from "../../components/mui/dialogs/CustomDialog";
import EditProfile from "./Edit";

const UserProfile = () => {
  // Sate
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // Hooks
  const { getCurrentUser } = useAuth();
  // Var
  const data = getCurrentUser();
  // console.log(data);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Get first letter of user's name
  const getFirstLetter = () => {
    const userName = getCurrentUser()?.name || "";
    return userName.charAt(0).toUpperCase();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, mx: "auto", textAlign: "start" }}>
        <CardHeader
          className="flex items-center gap-3"
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 32,
                  height: 32,
                  fontSize: "1rem",
                }}
              >
                {getFirstLetter()}
              </Avatar>
            )
          }
          action={
            loading ? null : (
              <OptionMenu
                iconButtonProps={{ size: "medium" }}
                iconClassName="text-textSecondary text-[22px]"
                options={[
                  // {
                  //   text: "View",
                  //   icon: "sm-eye-line text-[18px]",
                  //   href: "details",
                  //   linkProps: {
                  //     className:
                  //       "flex items-center gap-1 is-full plb-1.5 pli-4",
                  //   },
                  // },
                  {
                    text: "Edit",
                    icon: "sm-edit-line text-[18px]",
                    menuItemProps: {
                      onClick: () => handleOpen(),
                      className: "flex items-center gap-1",
                    },
                  },
                ]}
              />
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={20}
                width="80%"
                sx={{ mb: 0.5 }}
              />
            ) : (
              data.name
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={15} width="40%" />
            ) : (
              <bdi>{data.email}</bdi>
            )
          }
        />
        <Divider />
        <CardContent>
          {loading ? (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="80%" />
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: "text.secondary" }}
              >
                ID: {data.id}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: "text.secondary" }}
              >
                User Name: {data.username}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: "text.secondary" }}
              >
                Name: {data.name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: "text.secondary" }}
              >
                Email: {data.email}
              </Typography>
              <Divider className="my-3"/>
              <Typography variant="body1">
                Comments Count: {data.comments_count}
              </Typography>
              <Typography variant="body1">
                Posts Count: {data.posts_count}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <CustomDialog open={open} onClose={handleClose} maxWidth="sm">
        <EditProfile data={getCurrentUser()} onClose={handleClose} />
      </CustomDialog>
    </>
  );
};

export default UserProfile;
