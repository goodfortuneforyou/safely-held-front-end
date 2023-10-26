import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { shortenAddress } from "../utils/shortenAddress";
import { NFTContext } from "../context/NFTContext";
import { Loader, Button, Modal } from "../components";
import images from "../assets";

const NFTDetails = () => {
  // eslint-disable-next-line operator-linebreak
  const { currentAccount, nftCurrency, buyNFT, isLoadingNFT } =
    useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const router = useRouter();
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    setIsLoading(false);
  }, [router.isReady]);
  console.log(nft);
  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src={nft.image || images.nft2}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className=" flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flow-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-gray-1 border-nft-black-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal mb-2">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLocaleLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
              You can not buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="List on Marketplace"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={
                () =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  router.push(
                    // eslint-disable-next-line comma-dangle
                    `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                  )
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {isLoadingNFT && (
        <Modal
          header="Buying NFT..."
          body={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <div className="flexCenter flex-col text-center">
              <div className="relative w-52 h-52">
                <Loader />
              </div>
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {successModal && (
        <Modal
          header="Payment Successfull"
          body={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={nft.image || images.nft10}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                You successfully purchased{" "}
                <span className="font-semibold">{nft.name} </span>
                from
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <div className="flexCenter flex-col">
              <Button
                btnName="Checkout it out"
                classStyles=" sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push("/my-nfts")}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default NFTDetails;
