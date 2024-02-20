  toot="/usr/bin/toot"
  content="${@:2}"
  #To get Account ID from Mastodon API use the following command https://techhub.social/api/v1/accounts/lookup?acct=AccountName
  api="https://techhub.social/api/v1/accounts/109365185680416762/statuses?limit=1"  
  final_toot="/tmp/toot"

  function usage {
          echo 'post-toot.sh [-np] "content of the toot"' 2>&1
          echo '   -n  Toot a note'
          echo '   -p  Toot a post'
          exit 1
  }

  # if no input argument found, exit the script with usage
  if [[ ${#} -eq 0 ]]; then
    usage
  fi

  # Define list of arguments expected in the input
  optstring=":np:"

  while getopts ${optstring} arg; do
    case ${arg} in
      n)
        POST='notes'
        ;;
      p)
        POST='posts'
        ;;
      ?)
        echo "Invalid option: -${OPTARG}."
        echo
        usage
        ;;
    esac
  done

  last_file=$( ls -1 -drt $HOME/DevOPS/blog/content/post/* |tail -1 )
  url=$( rg replyto: $last_file | awk '{print $2}' | head -1 )
  
  echo $content >  $final_toot
  echo $url     >> $final_toot   

  # tooting 
  $toot post < $final_toot

  sleep 5

  curl -s ${api} | jq '.[].id' >! /tmp/status.id; sed -i 's/\"//g' /tmp/status.id
  id=$( cat /tmp/status.id); sed -i "s/id: /id: ${id}/" $last_file

  # redeploying the blog
  ${HOME}/bin/lazybear-deploy

  # cleaning up
  rm $final_toot