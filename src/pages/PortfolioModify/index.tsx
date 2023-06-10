import { useParams } from 'react-router-dom';
import PortfolioWritingForm from '../../components/PortfolioWritingForm/PortfolioWritingForm';
import * as Fetcher from '../../apis/Fetcher';
import { useEffect, useState } from 'react';
import * as Interface from '../../interfaces/Portfolio.interface';

function PortfolioWriting() {
  const params = useParams();
  const [portflioData, setPortfolioData] = useState<Interface.TypePortfolioDetail>();
  const getPortfolioData = async () => {
    try {
      const response = await Fetcher.getPortfolio(params.id!);
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPortfolioData();
      setPortfolioData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(portflioData);
  }, [portflioData]);

  return portflioData ? (
    <PortfolioWritingForm editMode={true} publishedPostData={portflioData} />
  ) : (
    <></>
  );
}

export default PortfolioWriting;
