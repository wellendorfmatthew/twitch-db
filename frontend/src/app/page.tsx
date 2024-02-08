import Image from "next/image";
import HASHTAG from '../../public/sign-hashtag--mail-sharp-sign-hashtag-tag.png'
import FOLLOWERS from '../../public/heart--reward-social-rating-media-heart-it-like-favorite-love.png';
import LANGUAGE from '../../public/dictionary-language-book.png';
import MOUSE from '../../public/mouse.png';
import JUST_CHATTING from '../../public/justchat.png';
import TWITCHDB_LOGO from '../../public/twitchdblogo.png';
import SEARCH from '../../public/black-search.png';
import PERSON from '../../public/user-circle-single--circle-geometric-human-person-single-user.png';
import GAME from '../../public/gameboy--entertainment-gaming-device-gameboy.png';
import FILTER from '../../public/align-center--text-alignment-align-paragraph-centered-formatting-center.png';
import ARROW from '../../public/dropdown-arrow.png';

export default function Home() {
  return (
    <div className='h-screen flex flex-col items-center bg-zinc-900'>
      <Image
        src={TWITCHDB_LOGO}
        alt="TwitchDB Logo"
        className='mt-10'
       />
      <div className='flex items-center rounded-full bg-white justify-start h-14 w-96 mt-10'>
        <Image src={SEARCH} alt="Magnifying glass" className='ml-4' width={22} height={22}/>
        <input type="text" className='h-8 outline-none border-none ml-2 w-10/12'/>
      </div>
      <div className='flex items-center justify-between rounded-2xl bg-zinc-700 h-16 px-4 mt-8'>
        <div className='flex items-center justify-between rounded-2xl border-2 border-white h-10 w-40 px-3'>
          <Image src={PERSON} alt="" />
          <p className='text-l text-white'>Streamers</p>
          <Image src={ARROW} alt="" />
        </div>
        <div className='flex items-center justify-between rounded-2xl border-2 border-white h-10 w-40 px-3 mx-56'>
          <Image src={GAME} alt="" />
          <p className='text-l text-white'>Games</p>
          <Image src={ARROW} alt="" />
        </div>      
        <div className='flex items-center justify-between rounded-2xl border-2 border-white h-10 w-40 px-3'>
          <Image src={FILTER} alt="" />
          <p className='text-l text-white'>Filters</p>
          <Image src={ARROW} alt="" />
        </div>
      </div>
      <div className='flex items-center justify-center rounded-2xl bg-zinc-700 mt-6'>
        <div className='grid grid-cols-12'>
          <div className='size-20 flex items-center justify-center border-r-2'>
            <Image src={HASHTAG} alt="Rank" />
          </div>
          <div className='flex items-center justify-center border-r-2 col-span-3'>
            <p className='text-l text-white'>Streamer</p>
          </div>
          <div className='flex items-center justify-center border-r-2'>
            <p className='text-l text-white'>Status</p>
          </div>
          <div className='flex items-center justify-center border-r-2'>
            <Image src={LANGUAGE} alt="Lang" />
          </div>
          <div className='flex items-center justify-center border-r-2'>
            <Image src={FOLLOWERS} alt="Follows" />
          </div>
          <div className='flex items-center justify-center border-r-2'>
            <p className='text-l text-white'>Game</p>
          </div>
          <div className='flex items-center justify-center border-r-2 col-span-2'>
            <p className='text-l text-white'>Peak Viewers</p>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>Current Viewers</p>
          </div>
          <div className='size-20 flex items-center justify-center border-t-2'>
            <p className='text-3xl text-white'>1</p>
          </div>
          <div className='flex items-center justify-center border-t-2 col-span-3'>
            <div className='flex items-center justify-center gap-x-2'>
              <Image src={MOUSE} alt="" width={30} height={30}/>
              <p className='text-l text-white'>Ironmouse</p>
            </div>
          </div>
          <div className='flex items-center justify-center border-t-2'>
            <p className='text-l text-white'>Live</p>
          </div>
          <div className='flex items-center justify-center border-t-2'>
            <p className='text-l text-white'>EN</p>
          </div>
          <div className='flex items-center justify-center border-t-2'>
            <p className='text-l text-white'>1M</p>
          </div>
          <div className='flex items-center justify-center border-t-2'>
            <Image src={JUST_CHATTING} alt="" width={30} height={40}/>
          </div>
          <div className='flex items-center justify-center border-t-2 col-span-2'>
            <p className='text-l text-white'>10845</p>
          </div>
          <div className='flex items-center justify-center border-t-2 col-span-2'>
            <p className='text-l text-white'>6234</p>
          </div>
          <div className='size-20 flex items-center justify-center'>
            <p className='text-3xl text-white'>2</p>
          </div>
          <div className='flex items-center justify-center col-span-3'>
            <div className='flex items-center justify-center gap-x-2'>
              <Image src={MOUSE} alt="" width={30} height={30}/>
              <p className='text-l text-white'>Ironmouse</p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>Live</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>EN</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>1M</p>
          </div>
          <div className='flex items-center justify-center'>
            <Image src={JUST_CHATTING} alt="" width={30} height={40}/>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>10845</p>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>6234</p>
          </div>
          <div className='size-20 flex items-center justify-center'>
            <p className='text-3xl text-white'>3</p>
          </div>
          <div className='flex items-center justify-center col-span-3'>
            <div className='flex items-center justify-center gap-x-2'>
              <Image src={MOUSE} alt="" width={30} height={30}/>
              <p className='text-l text-white'>Ironmouse</p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>Live</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>EN</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>1M</p>
          </div>
          <div className='flex items-center justify-center'>
            <Image src={JUST_CHATTING} alt="" width={30} height={40}/>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>10845</p>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>6234</p>
          </div>
          <div className='size-20 flex items-center justify-center'>
            <p className='text-3xl text-white'>4</p>
          </div>
          <div className='flex items-center justify-center col-span-3'>
            <div className='flex items-center justify-center gap-x-2'>
              <Image src={MOUSE} alt="" width={30} height={30}/>
              <p className='text-l text-white'>Ironmouse</p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>Live</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>EN</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>1M</p>
          </div>
          <div className='flex items-center justify-center'>
            <Image src={JUST_CHATTING} alt="" width={30} height={40}/>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>10845</p>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>6234</p>
          </div>       
          <div className='size-20 flex items-center justify-center'>
            <p className='text-3xl text-white'>5</p>
          </div>
          <div className='flex items-center justify-center col-span-3'>
            <div className='flex items-center justify-center gap-x-2'>
              <Image src={MOUSE} alt="" width={30} height={30}/>
              <p className='text-l text-white'>Ironmouse</p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>Live</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>EN</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-l text-white'>1M</p>
          </div>
          <div className='flex items-center justify-center'>
            <Image src={JUST_CHATTING} alt="" width={30} height={40}/>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>10845</p>
          </div>
          <div className='flex items-center justify-center col-span-2'>
            <p className='text-l text-white'>6234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
