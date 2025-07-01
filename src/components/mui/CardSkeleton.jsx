import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Skeleton,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const testData = {
  name: "Ibrahim Al-Zilah",
  time: "2 hours ago",
  avatar:
    "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg",
  alt: "Ted talk",
  media: {
    avatar:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    alt: "talk stage",
  },
  desc: "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:",
};

function Media(props) {
  const { loading = false } = props;

  return (
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
            <Avatar src={testData.avatar} alt={testData.alt} />
          )
        }
        action={
          loading ? null : (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={20}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            testData.name
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={15} width="40%" />
          ) : (
            <bdi>{testData.time}</bdi>
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={testData.media.avatar}
          alt={testData.media.alt}
        />
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.secondary" }}
          >
            {testData.desc}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

const CardSkeleton = ({ loading = false }) => {
  return (
    <>
      <Grid container spacing={8}>
        <Grid size="grow" marginBottom={4}>
          <Media loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};

CardSkeleton.propTypes = {
  loading: PropTypes.bool,
};

Media.propTypes = {
  loading: PropTypes.bool,
};

export default CardSkeleton;
