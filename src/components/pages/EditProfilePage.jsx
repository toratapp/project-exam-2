import FirstHeading from "../common/FirstHeading";
import EditProfileForm from "../profile/EditProfileForm";

function EditProfile() {
  return (
    <section className="container p-7 flex flex-col max-w-screen-sm mx-auto mb-20 mt-16">
      <FirstHeading>Edit profile</FirstHeading>
      <EditProfileForm />
    </section>
  );
}

export default EditProfile;
