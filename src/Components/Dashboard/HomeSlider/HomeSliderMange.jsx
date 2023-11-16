import useHomeSlider from "@/src/Hooks/useHomeSlider";
import { Card, CardActions, CardMedia, IconButton } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManegePhotoGelary = () => {
    const {homeSliderData,handelHomeSliderDelete} = useHomeSlider()

 
  return (
    <section>
      <h2 className="py-4 text-2xl font-bold ">Manage Photo Gelary</h2>

      <div className="grid md:grid-cols-3 gap-4 justify-center items-center">
        {homeSliderData &&
          homeSliderData?.length &&
          homeSliderData?.map((slider) => {
            const { _id, image } = slider;
            return (
              <Card sx={{ maxWidth: 400 }} key={_id}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={"Brand Image  "}
                  className="w-[100%] h-[200px] object-cover"
                />

                <CardActions disableSpacing>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handelHomeSliderDelete(_id)}
                  >
                    <FaRegTrashAlt className="text-[2.3rem] mr-3 text-red-500" />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </section>
  );
};

export default ManegePhotoGelary;